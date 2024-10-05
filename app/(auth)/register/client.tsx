'use client'

import { register } from '@/actions/auth'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { useFormState } from 'react-dom'

export function ClientPage() {
	const [state, action] = useFormState(register, null)

	return (
		<div className='grid gap-6'>
			<form action={action}>
				<div className='grid gap-y-4 gap-x-2 grid-cols-2'>
					<FormInput label='First name' name='firstName' placeholder='Max' error={state?.errors.firstName} />
					<FormInput label='Last name' name='lastName' placeholder='Robinson' error={state?.errors.lastName} />
					<FormInput
						className='col-span-full'
						label='Email address'
						name='email'
						placeholder='name@example.com'
						type='email'
						error={state?.errors.email}
					/>
					<FormInput label='Password' name='password' type='password' error={state?.errors.password} />
					<FormInput label='Confirm password' name='confirmPassword' type='password' error={state?.errors.confirmPassword} />
					<ActionButton className='col-span-full'>Sign In with Email</ActionButton>
				</div>
			</form>
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
				{/* <Button variant='outline' type='button' disabled={isLoading}>
					{isLoading ? <Loader2Icon className='mr-2 h-4 w-4 animate-spin' /> : <ChromeIcon className='mr-2 h-4 w-4' />} Google
				</Button> */}
				{/* TODO: GitHub sign in */}
				{/* <Button variant='outline' type='button' disabled={isLoading}>
					{isLoading ? <Loader2Icon className='mr-2 h-4 w-4 animate-spin' /> : <GitHubLogoIcon className='mr-2 h-4 w-4' />} GitHub
				</Button> */}
			</div>
		</div>
	)
}
