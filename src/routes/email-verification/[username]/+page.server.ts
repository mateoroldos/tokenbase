import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from '../$types'
import { generateEmailVerificationToken } from '$lib/features/user-management/token'
import { sendEmailVerificationLink } from '$lib/features/user-management/email'
import { getStoredUserByUsername } from '$lib/features/user-management/user'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session?.user.emailVerified) {
		throw redirect(302, '/')
	}

	return {}
}

export const actions: Actions = {
	default: async ({ locals, params }) => {
		const { username } = params

		const storedUser = await getStoredUserByUsername(username)

		if (!storedUser) {
			return fail(400, {
				notUser: true
			})
		}

		if (storedUser.email_verified) {
			throw redirect(302, '/')
		}

		try {
			const token = await generateEmailVerificationToken(storedUser.id)
			await sendEmailVerificationLink(token, {
				username: storedUser.username,
				email: storedUser.email
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
