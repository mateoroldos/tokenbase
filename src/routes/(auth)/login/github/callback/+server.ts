import { auth, githubAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { getUserByEmail } from '$lib/features/auth/queries/getUserByEmail'
import { getGithubUserEmails } from '$lib/services/github/github.js'

export const GET = async ({ url, cookies, locals }) => {
	const session = await locals.auth.validate()

	if (session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		})
	}

	const storedState = cookies.get('github_oauth_state')
	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		})
	}

	try {
		const { getExistingUser, createUser, githubTokens, createKey } =
			await githubAuth.validateCallback(code)

		const getUser = async () => {
			const existingUser = await getExistingUser()
			if (existingUser) return existingUser

			const githubUserEmails = await getGithubUserEmails(
				githubTokens.accessToken
			)
			const primaryEmail = githubUserEmails.find(
				(email) => email.verified && email.primary
			)
			if (!primaryEmail) {
				throw new Error('No verified email found')
			}

			const existingDatabaseUserWithEmail = await getUserByEmail(
				primaryEmail.email
			)

			if (existingDatabaseUserWithEmail) {
				// transform `UserSchema` to `User`
				const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail)
				await createKey(user.userId)
				return user
			}

			const user = await createUser({
				attributes: {
					email: primaryEmail.email,
					email_verified: false
				}
			})
			return user
		}

		const user = await getUser()

		if (!user) {
			return new Response(null, {
				status: 500
			})
		}

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		})

		locals.auth.setSession(session)

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		})
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			})
		}
		return new Response(null, {
			status: 500
		})
	}
}
