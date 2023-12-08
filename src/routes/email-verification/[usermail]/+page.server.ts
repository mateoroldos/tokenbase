import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from '../[usermail]/$types'
import { sendEmailVerificationLink } from '$lib/features/user-management/emails/sendEmailVerificationLink'
import { generateEmailVerificationToken } from '$lib/features/user-management/tokens/generateEmailVerificationToken'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail'
import { auth } from '$lib/server/lucia'
import { LuciaError } from 'lucia'

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
		let alreadyVerified = false

		try {
			const userKey = await auth.getKey('email', usermail)

			const storedUser = await getStoredUserByEmail(userKey.providerUserId)

			if (storedUser) {
				if (storedUser.email_verified) {
					alreadyVerified = true
				} else {
					const token = await generateEmailVerificationToken(storedUser.id)
					await sendEmailVerificationLink(token, storedUser.email)

					return {
						success: true
					}
				}
			}
		} catch (e) {
			let message

			if (e instanceof LuciaError) {
				message = e.message
			}

			if (message === 'AUTH_INVALID_KEY_ID') {
				return fail(400, {
					notUser: true
				})
			} else {
				return fail(500, {
					message: 'An unknown error occurred'
				})
			}
		}

		if (alreadyVerified) {
			throw redirect(302, '/')
		}
	}
}
