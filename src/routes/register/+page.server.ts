import { redirect, type Actions, fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'

const signupSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(100),

	// my custom fields
	names: z.string().min(3).max(100),
	last_names: z.string().min(3).max(100)
})

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) return {}

	throw redirect(303, '/')
}) satisfies PageServerLoad

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, signupSchema)

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		try {
			console.log(form, 'formdata')

			// this does two things:
			// 1. create a user in the database
			// 2. create a key in the database
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: form.data.username,
					// lucia gonna hash the password automatically for you and saved it in the collection of keys in the database
					password: form.data.password
				},
				// this is the user attributes we put into model of user, this data gonna be saved in the collection of users in the database
				attributes: {
					username: form.data.username,

					// my custom fields
					names: form.data.names,
					last_names: form.data.last_names
				}
			})
			console.log('user creted', { user })
		} catch (error) {
			console.error(error)
			return fail(400)
		}
		console.log('Salió!!')
		throw redirect(303, '/')
	}
} satisfies Actions
