import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { generatePasswordResetToken } from '$lib/features/user-management/token'
import { sendPasswordResetLink } from '$lib/features/user-management/email'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { getStoredUserByEmail } from '../../lib/features/user-management/user'
import { findErrorByName } from '$lib/features/user-management/errors'

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
					message: 'User does not exist'
				})
			}

			const user = auth.transformDatabaseUser(storedUser)
			const token = await generatePasswordResetToken(user.userId)

			await sendPasswordResetLink(token, {
				username: user.username,
				email: user.email
			})

			return {
				success: true
			}
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			})
		}
	}
}