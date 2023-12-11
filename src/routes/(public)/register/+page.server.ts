import { redirect, type Actions, fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { LuciaError } from 'lucia'
import { findErrorByName } from '$lib/features/user-management/utils/findErrorByName'
import { sendEmailVerificationLink } from '$lib/features/user-management/mails/sendEmailVerificationLink'
import { generateEmailVerificationToken } from '$lib/features/user-management/tokens/generateEmailVerificationToken'
import { getUserByEmail } from '$lib/features/user-management/queries/getUserByEmail'
import { signupSchema } from './validationSchema'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification')
		throw redirect(302, '/')
	}

	return {}
}

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, signupSchema)

		if (!form.valid) {
			const passwordError = findErrorByName(form.errors, 'password')
			const passwordConfirmError = findErrorByName(
				form.errors,
				'confirmPassword'
			)
			const emailError = findErrorByName(form.errors, 'email')

			return fail(400, {
				errors: {
					passwordError,
					passwordConfirmError,
					emailError
				},
				incorrect: true
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
			console.log('token', token)

			await sendEmailVerificationLink(token, form.data.email)
		} catch (e) {
			let message

			if (e instanceof LuciaError) {
				message = e.message
			}

			if (message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					duplicatedEmail: true
				})
			}

			return fail(500, {
				unknownError: true
			})
		}

		throw redirect(302, `/email-verification/${form.data.email}`)
	}
} satisfies Actions
