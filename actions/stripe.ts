'use server'

import prisma from '@/lib/db'
import { stripe } from '@/lib/stripe/utils'
import { toDateTime } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import Stripe from 'stripe'

const TRIAL_PERIOD_DAYS = 0

const upsertProductRecord = async (product: Stripe.Product) => {
	const productData: Prisma.ProductCreateInput = {
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description ?? null,
		image: product.images?.[0] ?? null,
		metadata: product.metadata,
	}

	await prisma.product.upsert({ where: { id: productData.id }, create: productData, update: productData })
	console.log(`Product inserted/updated: ${product.id}`)
}

const upsertPriceRecord = async (price: Stripe.Price) => {
	const priceData: Prisma.PriceCreateInput = {
		id: price.id,
		product: { connect: { id: price.product as string } },
		active: price.active,
		currency: price.currency,
		type: price.type,
		unit_amount: price.unit_amount ?? null,
		interval: price.recurring?.interval ?? null,
		interval_count: price.recurring?.interval_count ?? null,
		trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
	}

	await prisma.price.upsert({ where: { id: priceData.id }, create: priceData, update: priceData })
	console.log(`Price inserted/updated: ${price.id}`)
}

const deleteProductRecord = async (product: Stripe.Product) => {
	await prisma.product.delete({ where: { id: product.id } })
	console.log(`Product deleted: ${product.id}`)
}

const deletePriceRecord = async (price: Stripe.Price) => {
	await prisma.price.delete({ where: { id: price.id } })
	console.log(`Price deleted: ${price.id}`)
}

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
	// const { error: upsertError } = await supabaseAdmin.from('customers').upsert([{ id: uuid, stripe_customer_id: customerId }])
	await prisma.customer.upsert({
		where: { id: uuid },
		create: { id: uuid, stripe_customer_id: customerId },
		update: { id: uuid, stripe_customer_id: customerId },
	})
	return customerId
}

const createCustomerInStripe = async (uuid: string, email: string) => {
	const customerData = { metadata: { supabaseUUID: uuid }, email: email }
	const newCustomer = await stripe.customers.create(customerData)
	if (!newCustomer) throw new Error('Stripe customer creation failed.')

	return newCustomer.id
}

const createOrRetrieveCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
	// Check if the customer already exists in db
	const existingCustomer = await prisma.customer.findUnique({ where: { id: uuid } })

	// Retrieve the Stripe customer ID using the db customer ID, with email fallback
	let stripeCustomerId: string | undefined
	if (existingCustomer?.stripe_customer_id) {
		const existingStripeCustomer = await stripe.customers.retrieve(existingCustomer.stripe_customer_id)
		stripeCustomerId = existingStripeCustomer.id
	} else {
		// If Stripe ID is missing from db, try to retrieve Stripe customer ID by email
		const stripeCustomers = await stripe.customers.list({ email: email })
		stripeCustomerId = stripeCustomers.data.length ? stripeCustomers.data[0].id : undefined
	}

	// If still no stripeCustomerId, create a new customer in Stripe
	const stripeIdToInsert = stripeCustomerId ? stripeCustomerId : await createCustomerInStripe(uuid, email)
	if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.')

	if (existingCustomer && stripeCustomerId) {
		// If db has a record but doesn't match Stripe, update db record
		if (existingCustomer.stripe_customer_id !== stripeCustomerId) {
			await prisma.customer.update({ where: { id: uuid }, data: { stripe_customer_id: stripeCustomerId } })
			console.warn('Db customer record mismatched Stripe ID. db record updated.')
		}
		// If db has a record and matches Stripe, return Stripe customer ID
		return stripeCustomerId
	} else {
		console.warn('Db customer record was missing. A new record was created.')

		// If db has no record, create a new record and return Stripe customer ID
		const upsertedStripeCustomer = await upsertCustomerToSupabase(uuid, stripeIdToInsert)
		if (!upsertedStripeCustomer) throw new Error('Db customer record creation failed.')

		return upsertedStripeCustomer
	}
}

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (uuid: string, payment_method: Stripe.PaymentMethod) => {
	const customer = payment_method.customer as string
	const { name, phone, address } = payment_method.billing_details
	if (!name || !phone || !address) return

	// @ts-expect-error there is an issue with the stripe address
	await stripe.customers.update(customer, { name, phone, address })
	await prisma.user.update({
		where: { id: uuid },
		data: { billing_address: { ...address }, payment_method: { ...payment_method[payment_method.type] } },
	})
}

const manageSubscriptionStatusChange = async (subscriptionId: string, customerId: string, createAction = false) => {
	// Get customer's UUID from mapping table.
	const customerData = await prisma.customer.findUnique({ where: { stripe_customer_id: customerId } })
	const { id: uuid } = customerData!

	const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
		expand: ['default_payment_method'],
	})

	// Upsert the latest status of the subscription object.
	const subscriptionData: Prisma.SubscriptionCreateInput = {
		id: subscription.id,
		user: { connect: { id: uuid } },
		metadata: subscription.metadata,
		status: subscription.status,
		price: { connect: { id: subscription.items.data[0].price.id } },
		// @ts-expect-error there is an issue with the stripe quantity
		quantity: subscription.quantity,
		cancel_at_period_end: subscription.cancel_at_period_end,
		cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
		canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
		current_period_start: toDateTime(subscription.current_period_start).toISOString(),
		current_period_end: toDateTime(subscription.current_period_end).toISOString(),
		created: toDateTime(subscription.created).toISOString(),
		ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
		trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
		trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
	}

	await prisma.subscription.upsert({ where: { id: subscriptionData.id }, create: subscriptionData, update: subscriptionData })
	console.log(`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`)

	// For a new subscription copy the billing details to the customer object.
	// NOTE: This is a costly operation and should happen at the very end.
	if (createAction && subscription.default_payment_method && uuid)
		await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as Stripe.PaymentMethod)
}

export {
	createOrRetrieveCustomer,
	deletePriceRecord,
	deleteProductRecord,
	manageSubscriptionStatusChange,
	upsertPriceRecord,
	upsertProductRecord,
}
