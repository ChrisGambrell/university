import authFeature from '@/assets/auth-feature.jpg'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CommandIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ClientPage } from './client'

// TODO: Real testimonial
const testimonial = {
	name: 'Sofia Davis',
	quote: 'This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.',
}

export default function AuthenticationPage() {
	return (
		<div className='relative flex-col items-center justify-center grid lg:max-w-none lg:h-screen lg:grid-cols-2 lg:px-0'>
			<Link
				className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
				href='/examples/authentication'>
				Login
			</Link>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div className='absolute inset-0'>
					<Image className='w-full h-full object-cover' src={authFeature} alt='auth-feature' />
				</div>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<CommandIcon className='mr-2 h-6 w-6' />
					<span>Acme Inc</span>
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>&ldquo;{testimonial.quote}&rdquo;</p>
						<footer className='text-sm'>{testimonial.name}</footer>
					</blockquote>
				</div>
			</div>
			<div className='px-4 pt-24 lg:p-8'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
						<p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
					</div>
					<ClientPage />
					<p className='px-8 text-center text-sm text-muted-foreground'>
						By clicking continue, you agree to our {/* TODO: Terms of service */}
						<Link className='underline underline-offset-4 hover:text-primary' href='/terms'>
							Terms of Service
						</Link>{' '}
						and {/* TODO: Privacy policy */}
						<Link className='underline underline-offset-4 hover:text-primary' href='/privacy'>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	)
}
