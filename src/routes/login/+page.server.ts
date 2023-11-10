import type { Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification')
		throw redirect(302, '/')
	}

	return {}
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(100)
})

function findErrorByName(errors: { [key: string]: any }, name: string) {
	if (errors.hasOwnProperty(name)) {
		return errors[name]
	} else {
		return null
	}
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
