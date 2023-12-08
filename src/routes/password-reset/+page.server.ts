import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import { sendPasswordResetLink } from '$lib/features/user-management/emails/sendPasswordResetLink'
import { generatePasswordResetToken } from '$lib/features/user-management/tokens/generatePasswordResetToken'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail'
import { LuciaError } from 'lucia'

const signupSchema = z.object({
	email: z.string().email()
})

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}

	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signupSchema)

		if (!form.valid) {
			const emailError = findErrorByName(form.errors, 'email')

			return fail(400, {
				errors: {
					emailError
				},
				incorrect: true
			})
		}

		try {
			const userKey = await auth.getKey('email', form.data.email)

			const storedUser = await getStoredUserByEmail(userKey.providerUserId)

			if (storedUser) {
				const user = auth.transformDatabaseUser(storedUser)
				const token = await generatePasswordResetToken(user.userId)

				await sendPasswordResetLink(token, user.email)

				return {
					success: true
				}
			}
		} catch (e) {
			let message

			if (e instanceof LuciaError) {
				message = e.message
			}

			if (message === 'AUTH_INVALID_KEY_ID') {
				return fail(400, {
					message: 'Email not registered'
				})
			} else {
				return fail(500, {
					message: 'An unknown error occurred'
				})
			}
		}
	}
}
