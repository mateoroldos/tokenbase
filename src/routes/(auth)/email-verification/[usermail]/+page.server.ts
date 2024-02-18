import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { sendEmailVerificationLink } from '$lib/features/auth/mails/sendEmailVerificationLink'
import { generateEmailVerificationToken } from '$lib/features/auth/tokens/generate/generateEmailVerificationToken'
import { getUserByEmail } from '$lib/features/auth/queries/getUserByEmail'
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
	default: async ({ params, url }) => {
		const { usermail } = params
		let alreadyVerified = false

		try {
			const userKey = await auth.getKey('email', usermail)

			const storedUser = await getUserByEmail(userKey.providerUserId)

			if (storedUser) {
				if (storedUser.email_verified) {
					alreadyVerified = true
				} else {
					const token = await generateEmailVerificationToken(storedUser.id)
					await sendEmailVerificationLink(token, storedUser.email, url.origin)

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
