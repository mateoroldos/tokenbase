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
	MIN_PASSWORD_SIZE
} from '$lib/features/user-management/config/passwordSize'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}

	return {}
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE)
})

console.log('trying login')
console.log('authhhh', auth)

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema)

		console.log('validating form')

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
			console.log('validating key')

			const user = await getStoredUserByEmail(form.data.email.toLowerCase())
			console.log('user', user)

			const key = await auth.useKey(
				'email',
				form.data.email.toLowerCase(),
				form.data.password
			)

			console.log('key -----', key)

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})

			console.log('session -----', session)

			locals.auth.setSession(session)

			console.log('sessin is ready')
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
