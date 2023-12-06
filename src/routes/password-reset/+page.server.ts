import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import { sendPasswordResetLink } from '$lib/features/user-management/emails/sendPasswordResetLink'
import { generatePasswordResetToken } from '$lib/features/user-management/tokens/generatePasswordResetToken'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail'
import { getUserKeyProvider } from '$lib/features/user-management/user/getUserKeyProvider'

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
			const storedUser = await getStoredUserByEmail(form.data.email)

			if (!storedUser) {
				return fail(400, {
					message: 'Email not registered'
				})
			} else {
				const userKeyProvider = await getUserKeyProvider(storedUser.id, 'email')

				if (userKeyProvider) {
					const user = auth.transformDatabaseUser(storedUser)
					const token = await generatePasswordResetToken(user.userId)

					await sendPasswordResetLink(token, user.email)

					return {
						success: true
					}
				} else {
					return fail(400, {
						message: 'Email not registered'
					})
				}
			}
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			})
		}
	}
}
