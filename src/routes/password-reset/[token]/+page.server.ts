import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad, Actions } from './$types'
import { validatePasswordResetToken } from '$lib/features/user-management/tokens/validatePasswordResetToken'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import { isValidPasswordResetToken } from '$lib/features/user-management/tokens/isValidPasswordResetToken'
import {
	MAX_PASSWORD_SIZE,
	MIN_PASSWORD_SIZE
} from '$lib/features/user-management/config/passwordSize'
MAX_PASSWORD_SIZE

const signupSchema = z.object({
	password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE)
})

export const load: PageServerLoad = async ({ params }) => {
	const { token } = params

	const validToken = await isValidPasswordResetToken(token)

	if (!validToken) {
		throw redirect(302, '/password-reset')
	}

	return {}
}

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, signupSchema)

		const { token } = params

		if (!form.valid) {
			const passwordError = findErrorByName(form.errors, 'password')

			return fail(400, {
				errors: {
					passwordError
				},
				incorrect: true
			})
		}

		try {
			const userId = await validatePasswordResetToken(token)

			let user = await auth.getUser(userId)

			await auth.invalidateAllUserSessions(user.userId)
			await auth.updateKeyPassword('email', user.email, form.data.password)

			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true
				})
			}
		} catch (e) {
			return fail(400, {
				message: 'Invalid password reset link'
			})
		}
		throw redirect(302, '/login')
	}
}
