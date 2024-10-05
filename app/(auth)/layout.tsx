import authFeature from '@/assets/auth-feature.jpg'
import { LayoutProps } from '@cgambrell/utils'
import { CommandIcon } from 'lucide-react'
import Image from 'next/image'

// TODO: Real testimonial
const testimonial = {
	name: 'Sofia Davis',
	quote: 'This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.',
}

export default function AuthLayout({ children }: LayoutProps) {
	return (
		<div className='relative flex-col items-center justify-center grid lg:max-w-none lg:h-screen lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div className='absolute inset-0'>
					<Image className='w-full h-full object-cover' src={authFeature} alt='auth-feature' />
				</div>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					{/* TODO: Correct icon */}
					<CommandIcon className='mr-2 h-6 w-6' />
					{/* TODO: Correct app name */}
					<span>Acme Inc</span>
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>&ldquo;{testimonial.quote}&rdquo;</p>
						<footer className='text-sm'>{testimonial.name}</footer>
					</blockquote>
				</div>
			</div>
			<div className='px-4 pt-24 lg:p-8'>{children}</div>
		</div>
	)
}
