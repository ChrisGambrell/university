'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { createTeamSchema } from '@/validators/team'
import { getSuccessRedirect, parseFormData } from '@cgambrell/utils'
import { redirect } from 'next/navigation'

export async function createTeam(_prevState: unknown, formData: FormData) {
	const { data, errors } = parseFormData(formData, createTeamSchema)
	if (errors) return { errors }

	const user = await auth()
	await prisma.team.create({ data: { ...data, ownerId: user.id } })

	// TODO: Redirect to new team
	redirect(getSuccessRedirect('/', 'Team created'))
}
