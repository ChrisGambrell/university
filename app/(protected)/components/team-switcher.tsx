'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function TeamSwitcher({
	teams,
}: {
	teams: {
		href: string
		label: string
		value: string
	}[]
}) {
	const router = useRouter()
	const [selected, setSelected] = useState<string>(teams[0].value)

	return (
		<div className='flex-1'>
			<Select
				value={selected}
				onValueChange={(value) => {
					if (value === '_new') return router.push('/teams/new')
					setSelected(value)
					// TODO: Create teams page
					router.push(teams.find((team) => team.value === value)?.href ?? '')
				}}>
				<SelectTrigger
					className='w-[250px] flex bg-background shadow-none items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0'
					aria-label='Select account'>
					<SelectValue placeholder='Select an account'>
						<span className='ml-2'>{teams.find((team) => team.value === selected)?.label}</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{teams.map((team) => (
						<SelectItem key={team.value} value={team.value}>
							<div className='ml-6 flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
								{team.label}
							</div>
						</SelectItem>
					))}
					<SelectItem value='_new'>
						<div className='flex items-center gap-2'>
							<PlusCircleIcon className='size-4' />
							<span>Create team</span>
						</div>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
