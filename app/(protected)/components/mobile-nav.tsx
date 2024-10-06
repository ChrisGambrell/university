import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { APP_ICON, APP_NAME, cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { navLinks } from './links'

export function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
					<MenuIcon className='h-5 w-5' />
					<span className='sr-only'>Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='flex flex-col'>
				<nav className='grid gap-2 text-lg font-medium'>
					<Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
						<APP_ICON className='h-6 w-6' />
						<span className='sr-only'>{APP_NAME}</span>
					</Link>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
								{
									// TODO: Correct active link styles
									'text-foreground bg-muted': link.href === '/products',
									'text-muted-foreground': link.href !== '/products',
								}
							)}>
							<link.icon className='size-5 mr-2' />
							<span>{link.label}</span>
							{link.badge !== null && link.badge !== undefined && (
								<Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
									{link.badge}
								</Badge>
							)}
						</Link>
					))}
				</nav>
				<div className='mt-auto'>
					<Card>
						<CardHeader>
							<CardTitle>Upgrade to Pro</CardTitle>
							<CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
						</CardHeader>
						<CardContent>
							<Button size='sm' className='w-full'>
								Upgrade
							</Button>
						</CardContent>
					</Card>
				</div>
			</SheetContent>
		</Sheet>
	)
}
