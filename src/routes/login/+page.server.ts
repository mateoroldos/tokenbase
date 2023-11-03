import type { Actions } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'

export const load = (async ({ locals }) => {
	// let's get the session from the locals
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

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema)

		if (!form.valid) {
			return fail(400, {
				form
			})
		}
		try {
			const key = await auth.useKey(
				'username',
				form.data.username,
				form.data.password
			)
			// console.log({key})

			// to create a session we need the pass the userId which is the id of the user in the database
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})
			console.log({ session })

			// now let's set the session so we can get the session everywhere in server like this page
			locals.auth.setSession(session)
		} catch (error) {
			console.error(error)
			return fail(400)
		}

		throw redirect(303, '/')
	}
} satisfies Actions
