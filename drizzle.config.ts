import type { Config } from 'drizzle-kit'

export default {
	schema: './src/lib/db/schema',
	out: './.drizzle',
	driver: 'mysql2',
	dbCredentials: {
		connectionString:
			'mysql://o911prps50la2nn1xw3j:pscale_pw_t6YWQFfRjy7G1pxHbGqAByNsfVnRvPqOpmjzhoybfJU@aws.connect.psdb.cloud/tokenbase?ssl={"rejectUnauthorized":true}'
	}
} as Config
