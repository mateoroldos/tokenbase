import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { generateEmailVerificationToken } from '$lib/features/auth/tokens/generate/generateEmailVerificationToken'
import { sendEmailVerificationLink } from '$lib/features/auth/mails/sendEmailVerificationLink'
import { formSchemaServer } from './schema'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}

	return {
		form: await superValidate(formSchemaServer)
	}
}

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, formSchemaServer)

		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Incorrect credentials' },
				{
					status: 403
				}
			)
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
				event.locals.auth.setSession(session)
			} else {
				const token = await generateEmailVerificationToken(user.userId)
				await sendEmailVerificationLink(
					token,
					form.data.email,
					event.url.origin
				)
			}
		} catch (e) {
			return message(
				form,
				{ type: 'error', text: 'Incorrect credentials' },
				{
					status: 403
				}
			)
		}

		if (!emailVerified) {
			throw redirect(303, `/email-verification/${form.data.email}`)
		}

		throw redirect(303, '/')
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate()

		if (!session) return fail(401)

		await auth.invalidateSession(session.sessionId)

		locals.auth.setSession(null)

		throw redirect(302, '/')
	}
}
