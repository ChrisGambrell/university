import { clsx, type ClassValue } from 'clsx'
import { CommandIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const toDateTime = (secs: number) => {
	const t = new Date(+0)
	t.setSeconds(secs)
	return t
}

// FIXME: Correct app name and icon
export const APP_NAME = 'Acme Inc.'
export const APP_ICON = CommandIcon
