import { redirect, type Actions, fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'

const signupSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(100),
	names: z.string().min(3).max(100),
	last_names: z.string().min(3).max(100)
})

function findErrorByName(errors, name) {
	if (errors.hasOwnProperty(name)) {
		return errors[name]
	} else {
		return null
	}
}

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) return {}

	throw redirect(303, '/')
}) satisfies PageServerLoad

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, signupSchema)

		if (!form.valid) {
			const usernameError = findErrorByName(form.errors, 'username')
			const passwordError = findErrorByName(form.errors, 'password')
			const nameError = findErrorByName(form.errors, 'names')
			const lastNameError = findErrorByName(form.errors, 'last_names')

			return fail(400, {
				errors: {
					usernameError,
					passwordError,
					nameError,
					lastNameError
				},
				incorrect: true
			})
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: form.data.username,
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					names: form.data.names,
					last_names: form.data.last_names
				}
			})

			console.log('user creted', { user })
		} catch (e) {
			let message

			if (e instanceof LuciaError) {
				message = e.message
			}

			if (message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					duplicated: true
				})
			}
		}

		throw redirect(303, '/')
	}
} satisfies Actions
