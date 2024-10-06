import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		AUTH_SECRET: z.string().min(1),

		AUTH_GITHUB_ID: z.string().min(1),
		AUTH_GITHUB_SECRET: z.string().min(1),

		AUTH_GOOGLE_ID: z.string().min(1),
		AUTH_GOOGLE_SECRET: z.string().min(1),

		AUTH_RESEND_KEY: z.string().min(1),
		AUTH_RESEND_EMAIL: z.string().email(),

		DATABASE_URL: z.string().url(),

		STRIPE_SECRET_KEY: z.string().min(1),
		STRIPE_WEBHOOK_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_SITE_URL: z.string().url(),
		NEXT_PUBLIC_NGROK_URL: process.env.NODE_ENV === 'development' ? z.string().url() : z.undefined(),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
	},
	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,

		AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
		AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,

		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,

		AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
		AUTH_RESEND_EMAIL: process.env.AUTH_RESEND_EMAIL,

		DATABASE_URL: process.env.DATABASE_URL,

		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_NGROK_URL: process.env.NEXT_PUBLIC_NGROK_URL,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
	},
})
