import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from '../[usermail]/$types'
import { sendEmailVerificationLink } from '$lib/features/user-management/emails/sendEmailVerificationLink'
import { generateEmailVerificationToken } from '$lib/features/user-management/tokens/generateEmailVerificationToken'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session?.user.emailVerified) {
		throw redirect(302, '/')
	}

	return {}
}

export const actions: Actions = {
	default: async ({ params }) => {
		const { usermail } = params

		const storedUser = await getStoredUserByEmail(usermail)

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
			await sendEmailVerificationLink(token, storedUser.email)

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
