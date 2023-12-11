import type { Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import { loginSchema } from './validationSchema'
import { generateEmailVerificationToken } from '$lib/features/user-management/tokens/generateEmailVerificationToken'
import { sendEmailVerificationLink } from '$lib/features/user-management/mails/sendEmailVerificationLink'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}
	return {}
}

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema)

		if (!form.valid) {
			const emailError = findErrorByName(form.errors, 'email')
			const passwordError = findErrorByName(form.errors, 'password')

			return fail(400, {
				errors: {
					emailError,
					passwordError
				},
				incorrect: true
			})
		}

		let emailVerified: boolean

		try {
			const key = await auth.useKey(
				'email',
				form.data.email.toLowerCase(),
				form.data.password
			)
			const user = await auth.getUser(key.userId)

			emailVerified = user.emailVerified

			if (emailVerified) {
				const session = await auth.createSession({
					userId: key.userId,
					attributes: {}
				})
				locals.auth.setSession(session)
			} else {
				const token = await generateEmailVerificationToken(user.userId)
				await sendEmailVerificationLink(token, form.data.email)
			}
		} catch (e) {
			let message

			if (e instanceof LuciaError) {
				message = e.message
			}

			if (message === 'AUTH_INVALID_KEY_ID') {
				return fail(400, {
					emailError: true
				})
			} else if (message === 'AUTH_INVALID_PASSWORD') {
				return fail(400, {
					passwordError: true
				})
			}

			return fail(500, {
				message: 'An unknown error occurred'
			})
		}

		if (!emailVerified) {
			throw redirect(303, `/email-verification/${form.data.email}`)
		}

		throw redirect(303, '/')
	}
} satisfies Actions
