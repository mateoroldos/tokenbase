import type { Config } from 'drizzle-kit'

export default {
	schema: './src/lib/db/schema',
	out: './.drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString:
			'postgresql://johndoe:randompassword@localhost:5432/postgres?schema=public' as string
	}
} as Config
