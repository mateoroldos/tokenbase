import { planetscale } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { github } from '@lucia-auth/oauth/providers'
import { dev } from '$app/environment'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'
import { connection } from '$lib/db'

export const auth = lucia({
	adapter: planetscale(connection, {
		key: 'user_key',
		session: 'user_session',
		user: 'auth_user'
	}),
	env: 'DEV',
	getUserAttributes: (userData) => ({
		email: userData.email,
		emailVerified: userData.email_verified
	}),
	middleware: sveltekit()
})

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	scope: ['read:user', 'user:email']
})

export type Auth = typeof auth
