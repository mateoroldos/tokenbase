import { validateEmailVerificationToken } from '$lib/features/user-management/tokens/validateEmailVerificationToken'
import { auth } from '$lib/server/lucia'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params
	try {
		const userId = await validateEmailVerificationToken(token)

		const user = await auth.getUser(userId)

		await auth.invalidateAllUserSessions(user.userId)
		await auth.updateUserAttributes(user.userId, {
			email_verified: true
		})

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/login'
			}
		})
	} catch {
		return new Response('Invalid email verification link', {
			status: 400
		})
	}
}