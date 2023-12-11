import { dev } from '$app/environment'
import { githubAuth } from '$lib/server/lucia.js'

export const GET = async ({ cookies, locals }) => {
	/**
	 * Check for a session. if it exists,
	 * redirect to a page of your liking.
	 */
	const session = await locals.auth.validate()

	if (session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		})
	}

	const [url, state] = await githubAuth.getAuthorizationUrl()

	// Store state that we can check later.
	cookies.set('github_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 30 * 24 * 60 * 60
	})

	// Redirect to github.
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	})
}
