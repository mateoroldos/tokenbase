import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import {
	isValidPasswordResetToken,
	validatePasswordResetToken
} from '$lib/features/user-management/token'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad, Actions } from './$types'

const signupSchema = z.object({
	password: z.string().min(6).max(100)
})

function findErrorByName(errors: { [key: string]: any }, name: string) {
	if (errors.hasOwnProperty(name)) {
		return errors[name]
	} else {
		return null
	}
}

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

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			})

			locals.auth.setSession(session)
		} catch (e) {
			return fail(400, {
				message: 'Invalid password reset link'
			})
		}
		throw redirect(302, '/')
	}
}
