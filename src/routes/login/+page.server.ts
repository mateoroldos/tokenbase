import type { Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import {
	MAX_PASSWORD_SIZE,
	MIN_PASSWORD_SIZE,
	PASSWORD_LOWERCASE,
	PASSWORD_LOWERCASE_MESSAGE,
	PASSWORD_NUMBER,
	PASSWORD_NUMBER_MESSAGE,
	PASSWORD_UPPERCASE,
	PASSWORD_UPPERCASE_MESSAGE
} from '$lib/features/user-management/config/passwordValidators'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(MIN_PASSWORD_SIZE)
		.max(MAX_PASSWORD_SIZE)
		.refine(PASSWORD_UPPERCASE, PASSWORD_UPPERCASE_MESSAGE)
		.refine(PASSWORD_LOWERCASE, PASSWORD_LOWERCASE_MESSAGE)
		.refine(PASSWORD_NUMBER, PASSWORD_NUMBER_MESSAGE)
})

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

		try {
			const key = await auth.useKey(
				'email',
				form.data.email.toLowerCase(),
				form.data.password
			)

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})

			locals.auth.setSession(session)
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

		throw redirect(303, '/')
	}
} satisfies Actions
