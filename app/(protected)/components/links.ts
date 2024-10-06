import { HomeIcon, LineChartIcon, PackageIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'

export const navLinks = [
	{ href: '/', icon: HomeIcon, label: 'Dashboard' },
	{ href: '/orders', icon: ShoppingCartIcon, label: 'Orders', badge: 6 },
	{ href: '/products', icon: PackageIcon, label: 'Products' },
	{ href: '/customers', icon: UsersIcon, label: 'Customers' },
	{ href: '/analytics', icon: LineChartIcon, label: 'Analytics' },
]

export type NavLink = (typeof links)[number]
