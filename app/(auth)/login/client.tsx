'use client'

import { login, oauth } from '@/actions/auth'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { useFormState } from 'react-dom'

export function ClientPage() {
	const [state, action] = useFormState(login, null)

	return (
		<form action={action} className='grid gap-4'>
			<FormInput label='Email address' name='email' placeholder='name@example.com' type='email' error={state?.errors.email} />
			<FormInput label='Password' name='password' type='password' error={state?.errors.password} />
			<ActionButton>Sign In with Email</ActionButton>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
				</div>
			</div>

			<div className='grid gap-2'>
				{/* TODO: Google sign in */}
				{/* <Button variant='outline'>
					<ChromeIcon className='mr-2 h-4 w-4' />
					<span>Google</span>
				</Button> */}
				<ActionButton formAction={oauth.bind(null, 'github')} variant='outline'>
					Login with Github
				</ActionButton>
			</div>
		</form>
	)
}
