import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { message, superValidate } from 'sveltekit-superforms/server'
import { sendPasswordResetLink } from '$lib/features/auth/mails/sendPasswordResetLink'
import { generatePasswordResetToken } from '$lib/features/auth/tokens/generate/generatePasswordResetToken'
import { getUserByEmail } from '$lib/features/auth/queries/getUserByEmail'
import { LuciaError } from 'lucia'
import { formSchema } from './schema'

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		throw redirect(302, '/')
	}

	return {
		form: await superValidate(formSchema)
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema)

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		try {
			const userKey = await auth.getKey('email', form.data.email)

			const storedUser = await getUserByEmail(userKey.providerUserId)

			if (storedUser) {
				const user = auth.transformDatabaseUser(storedUser)
				const token = await generatePasswordResetToken(user.userId)

				await sendPasswordResetLink(token, user.email)

				return message(form, {
					type: 'success',
					text: 'Password reset link sent'
				})
			}
		} catch (e) {
			let luciaMsg

			if (e instanceof LuciaError) {
				luciaMsg = e.message
			}

			if (luciaMsg === 'AUTH_INVALID_KEY_ID') {
				return message(
					form,
					{ type: 'error', text: 'Email not registered' },
					{
						status: 403
					}
				)
			} else {
				return message(
					form,
					{ type: 'error', text: 'An unknown error occured' },
					{
						status: 500
					}
				)
			}
		}
	}
}
