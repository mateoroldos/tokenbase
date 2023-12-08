import { auth, githubAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { handleRequest } from '$lib/features/user-management/utils/oauth'
import { getStoredUserByEmail } from '$lib/features/user-management/user/getStoredUserByEmail.js'

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
		const { githubTokens } = await githubAuth.validateCallback(code)

		const getUser = async () => {
			const request = new Request('https://api.github.com/user/emails', {
				headers: {
					Authorization: `Token ${githubTokens.accessToken}`
				}
			})

			const githubUserEmails = await handleRequest<GitHubUserEmail[]>(request)

			const primaryEmail = githubUserEmails.find((o) => o.verified && o.primary)

			if (!primaryEmail) {
				return null
			}

			const existingUser = await getStoredUserByEmail(primaryEmail.email)

			if (existingUser) {
				const userProviders = await auth.getAllUserKeys(existingUser.id)

				if (userProviders.some((obj) => obj.providerId === 'github')) {
					return {
						userId: existingUser.id
					}
				} else {
					await auth.createKey({
						userId: existingUser.id,
						providerId: 'github',
						providerUserId: existingUser.email,
						password: null
					})

					return {
						userId: existingUser.id
					}
				}
			} else {
				const user = await auth.createUser({
					key: {
						providerId: 'github',
						providerUserId: primaryEmail.email,
						password: null
					},
					attributes: {
						email: primaryEmail.email,
						email_verified: false
					}
				})
				return user
			}
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

type GitHubUserEmail = {
	email: string
	verified: boolean
	primary: boolean
	visibility: string
}
