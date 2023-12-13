import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) throw redirect(302, '/login')

	return {
		userId: session.user.userId,
		email: session.user.email
	}
}

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate()

		if (!session) return fail(401)

		await auth.invalidateSession(session.sessionId)

		locals.auth.setSession(null)

		throw redirect(302, '/login')
	}
}
