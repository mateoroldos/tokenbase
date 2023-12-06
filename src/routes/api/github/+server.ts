import { dev } from '$app/environment'
import { githubAuth } from '$lib/server/lucia.js'
import { json } from '@sveltejs/kit'

export async function GET({ cookies, locals }) {
	const session = await locals.auth.validate()

	if (session) {
		return json('/')
	}

	const [url, state] = await githubAuth.getAuthorizationUrl()

	cookies.set('github_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 30 * 24 * 60 * 60
	})

	return json(url.toString())
}
