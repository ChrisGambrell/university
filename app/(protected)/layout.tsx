import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { APP_ICON, APP_NAME } from '@/lib/utils'
import { LayoutProps } from '@cgambrell/utils'
import { BellIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { MobileNav } from './components/mobile-nav'
import { SideNav } from './components/side-nav'
import { TeamSwitcher } from './components/team-switcher'
import { UserMenu } from './components/user-menu'

export default async function ProtectedLayout({ children, modals }: LayoutProps & { modals: ReactNode }) {
	const user = await auth()
	const teams = await prisma.team.findMany({ where: { ownerId: user.id }, orderBy: { name: 'asc' } })

	return (
		<>
			<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
				<div className='hidden border-r bg-muted/40 md:block'>
					<div className='flex h-full max-h-screen flex-col gap-2'>
						<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
							<Link href='/' className='flex items-center gap-2 font-semibold'>
								<APP_ICON className='h-6 w-6' />
								<span className=''>{APP_NAME}</span>
							</Link>
							<Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
								<BellIcon className='h-4 w-4' />
								<span className='sr-only'>Toggle notifications</span>
							</Button>
						</div>

						<SideNav />

						<div className='mt-auto p-4'>
							{/* TODO: Hide this if already subscribed */}
							<Card>
								<CardHeader className='p-2 pt-0 md:p-4'>
									<CardTitle>Upgrade to Pro</CardTitle>
									<CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
								</CardHeader>
								<CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
									{/* TODO: Upgrade button */}
									<Button size='sm' className='w-full'>
										Upgrade
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
				<div className='flex flex-col'>
					<header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
						<MobileNav />
						<TeamSwitcher
							teams={[
								{ label: user.name ? `${user.name} (Personal)` : 'My team (Personal)', value: 'personal', href: '/' },
								...teams.map((team) => ({ label: team.name, value: team.id, href: `/teams/${team.id}` })),
							]}
						/>
						{/* TODO: Re-enable search */}
						{/* <NavSearch /> */}
						<UserMenu />
					</header>
					<main className='flex-1 p-4 lg:p-6'>{children}</main>
				</div>
			</div>
			{modals}
		</>
	)
}
