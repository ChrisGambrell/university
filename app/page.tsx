import { logout } from '@/actions/auth'
import { ActionButton } from '@/components/action-button'
import { auth } from '@/lib/auth'

export default async function RootPage() {
	await auth()
	return (
		<div>
			<div>hello, world!</div>
			<form action={logout}>
				<ActionButton>Sign Out</ActionButton>
			</form>
		</div>
	)
}
