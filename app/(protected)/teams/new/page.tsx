'use client'

import { createTeam } from '@/actions/team'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export default function NewTeamPage() {
	const router = useRouter()
	const [open, setOpen] = useState(true)
	const [state, action] = useFormState(createTeam, null)

	// BUG: If I try to open again before reloading, it won't open
	useEffect(() => {
		if (state === undefined) return setOpen(false)
		if (!open) router.back()
	}, [open, router, state])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a team</DialogTitle>
				</DialogHeader>
				<form action={action} className='grid gap-4'>
					<FormInput label='Team name' name='name' error={state?.errors.name} />

					<DialogFooter>
						<ActionButton>Create</ActionButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
