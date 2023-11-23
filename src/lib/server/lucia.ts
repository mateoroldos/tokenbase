import { planetscale } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { connection } from '$lib/db'
import 'lucia/polyfill/node'

export const auth = lucia({
	adapter: planetscale(connection, {
		key: 'user_key',
		session: 'user_session',
		user: 'auth_user'
	}),
	env: 'DEV',
	getUserAttributes: (userData) => ({
		username: userData.username,
		email: userData.email,
		emailVerified: userData.email_verified
	}),
	middleware: sveltekit()
})

export type Auth = typeof auth
