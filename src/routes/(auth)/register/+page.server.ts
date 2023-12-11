import { redirect, type Actions, fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from './$types'
import { message, superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'
import { sendEmailVerificationLink } from '$lib/features/auth/mails/sendEmailVerificationLink'
import { generateEmailVerificationToken } from '$lib/features/auth/tokens/generate/generateEmailVerificationToken'
import { getUserByEmail } from '$lib/features/auth/queries/getUserByEmail'
import { formSchema } from './schema'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification')
		throw redirect(302, '/')
	}

	return {
		form: await superValidate(formSchema)
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema)

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		try {
			const existingDatabaseUser = await getUserByEmail(form.data.email)
			let user = existingDatabaseUser
				? auth.transformDatabaseUser(existingDatabaseUser)
				: undefined

			if (user === undefined) {
				user = await auth.createUser({
					key: {
						providerId: 'email',
						providerUserId: form.data.email.toLowerCase(),
						password: form.data.password
					},
					attributes: {
						email: form.data.email.toLowerCase(),
						email_verified: false
					}
				})
			} else {
				await auth.createKey({
					userId: user.userId,
					providerId: 'email',
					providerUserId: form.data.email.toLowerCase(),
					password: form.data.password
				})
			}

			const token = await generateEmailVerificationToken(user.userId)
			await sendEmailVerificationLink(token, form.data.email)
		} catch (e) {
			let luciaMessage

			if (e instanceof LuciaError) {
				luciaMessage = e.message
			}

			if (luciaMessage === 'AUTH_DUPLICATE_KEY_ID') {
				return message(
					form,
					{ type: 'error', text: 'This email is already registered.' },
					{
						status: 400
					}
				)
			}

			return message(
				form,
				{ type: 'error', text: 'An unknown error occured.' },
				{
					status: 500
				}
			)
		}

		throw redirect(302, `/email-verification/${form.data.email}`)
	}
} satisfies Actions
