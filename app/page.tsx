import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
	BellIcon,
	CircleUserIcon,
	CommandIcon,
	HomeIcon,
	LineChartIcon,
	MenuIcon,
	PackageIcon,
	SearchIcon,
	ShoppingCartIcon,
	UsersIcon,
} from 'lucide-react'
import Link from 'next/link'

const links = [
	{ href: '/', icon: HomeIcon, label: 'Dashboard' },
	{ href: '/orders', icon: ShoppingCartIcon, label: 'Orders', badge: 6 },
	{ href: '/products', icon: PackageIcon, label: 'Products' },
	{ href: '/customers', icon: UsersIcon, label: 'Customers' },
	{ href: '/analytics', icon: LineChartIcon, label: 'Analytics' },
]

export default function RootPage() {
	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
						<Link href='/' className='flex items-center gap-2 font-semibold'>
							{/* TODO: Correct logo & app name */}
							<CommandIcon className='h-6 w-6' />
							{/* TODO: Correct logo & app name */}
							<span className=''>Acme Inc</span>
						</Link>
						<Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
							<BellIcon className='h-4 w-4' />
							<span className='sr-only'>Toggle notifications</span>
						</Button>
					</div>
					<div className='flex-1'>
						<nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
							{links.map((link) => (
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
										<Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
											{link.badge}
										</Badge>
									)}
								</Link>
							))}
						</nav>
					</div>
					<div className='mt-auto p-4'>
						<Card x-chunk='dashboard-02-chunk-0'>
							<CardHeader className='p-2 pt-0 md:p-4'>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
							</CardHeader>
							<CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
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
									<CommandIcon className='h-6 w-6' />
									<span className='sr-only'>Acme Inc</span>
								</Link>
								{links.map((link) => (
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
					<div className='w-full flex-1'>
						<form>
							<div className='relative'>
								<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
								<Input
									type='search'
									placeholder='Search products...'
									className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' size='icon' className='rounded-full'>
								<CircleUserIcon className='h-5 w-5' />
								<span className='sr-only'>Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
					<div className='flex items-center'>
						<h1 className='text-lg font-semibold md:text-2xl'>Inventory</h1>
					</div>
					<div
						className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
						x-chunk='dashboard-02-chunk-1'>
						<div className='flex flex-col items-center gap-1 text-center'>
							<h3 className='text-2xl font-bold tracking-tight'>You have no products</h3>
							<p className='text-sm text-muted-foreground'>You can start selling as soon as you add a product.</p>
							<Button className='mt-4'>Add Product</Button>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
