import { planetscale } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { connection } from '$lib/db'

export const auth = lucia({
	adapter: planetscale(connection, {
		key: 'user_key',
		session: 'user_session',
		user: 'auth_user'
	}),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: (userData) => ({
		username: userData.username,
		names: userData.names,
		last_names: userData.last_names
	}),
	middleware: sveltekit()
})

export type Auth = typeof auth
