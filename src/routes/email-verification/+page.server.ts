import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { generateEmailVerificationToken } from '$lib/features/user-management/token'
import { sendEmailVerificationLink } from '$lib/features/user-management/email'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) throw redirect(302, '/login')

	if (session.user.emailVerified) {
		throw redirect(302, '/')
	}

	return {}
}

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate()

		if (!session) throw redirect(302, '/login')

		if (session.user.emailVerified) {
			throw redirect(302, '/')
		}

		try {
			const token = await generateEmailVerificationToken(session.user.userId)
			await sendEmailVerificationLink(token, {
				username: session.user.username,
				email: session.user.email
			})

			return {
				success: true
			}
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			})
		}
	}
}
