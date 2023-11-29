import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config()

export default {
	schema: './src/lib/db/schema',
	out: './.drizzle',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.SECRET_DATABASE_URL
	}
} as Config
