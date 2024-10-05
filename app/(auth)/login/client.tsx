'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'

export function ClientPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<div className='grid gap-6'>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />}
						Sign In with Email
					</Button>
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
