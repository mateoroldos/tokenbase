import { connect } from '@planetscale/database'
import { SECRET_DATABASE_URL } from '$env/static/private'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from '$lib/db/schema'

console.log('SECRET_DATABASE_URL', SECRET_DATABASE_URL)

export const connection = connect({
	url: SECRET_DATABASE_URL
})

export const db = drizzle(connection, { schema })

console.log('drizzle DB!!', db)
