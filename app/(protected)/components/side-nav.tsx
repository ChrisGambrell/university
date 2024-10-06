import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { navLinks } from './links'

export function SideNav() {
	return (
		<div className='flex-1'>
			<nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
				{navLinks.map((link) => (
					<Link
						key={link.href}
						className={cn('flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary', {
							// TODO: Correct active link styles
							'bg-muted text-primary': link.href === '/products',
							'text-muted-foreground': link.href !== '/products',
						})}
						href={link.href}>
						<link.icon className='size-4' />
						<span>{link.label}</span>
						{link.badge !== null && link.badge !== undefined && (
							<Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>{link.badge}</Badge>
						)}
					</Link>
				))}
			</nav>
		</div>
	)
}
