import type { Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) {
		return {}
	}

	throw redirect(303, '/')
}) satisfies PageServerLoad

const loginSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(100)
})

function findErrorByName(errors, name) {
	if (errors.hasOwnProperty(name)) {
		return errors[name]
	} else {
		return null // Return null if not found
	}
}

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema)

		if (!form.valid) {
			const usernameError = findErrorByName(form.errors, 'username')
			const passwordError = findErrorByName(form.errors, 'password')

			return fail(400, {
				errors: {
					usernameError,
					passwordError
				},
				incorrect: true
			})
		}

		try {
			const key = await auth.useKey(
				'username',
				form.data.username,
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
					usernameError: true
				})
			} else if (message === 'AUTH_INVALID_PASSWORD') {
				return fail(400, {
					passwordError: true
				})
			}
		}

		throw redirect(303, '/')
	}
} satisfies Actions
