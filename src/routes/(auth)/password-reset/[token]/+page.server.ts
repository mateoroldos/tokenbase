import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad, Actions } from './$types'
import { validatePasswordResetToken } from '$lib/features/auth/tokens/validate/validatePasswordResetToken'
import { isValidPasswordResetToken } from '$lib/features/auth/tokens/utils/isValidPasswordResetToken'
import { formSchema } from './schema'

export const load: PageServerLoad = async ({ params }) => {
	const { token } = params

	const validToken = await isValidPasswordResetToken(token)

	if (!validToken) {
		throw redirect(302, '/password-reset')
	}

	return {
		form: await superValidate(formSchema)
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema)

		const { token } = event.params

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		try {
			const userId = await validatePasswordResetToken(token)

			let user = await auth.getUser(userId)

			await auth.invalidateAllUserSessions(user.userId)
			await auth.updateKeyPassword('email', user.email, form.data.password)

			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true
				})
			}
		} catch (e) {
			return message(
				form,
				{ type: 'error', text: 'Error reseting the password' },
				{
					status: 500
				}
			)
		}
		throw redirect(302, '/login')
	}
}
