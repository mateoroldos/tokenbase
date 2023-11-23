import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from '$lib/db/schema'
import {
	SECRET_DATABASE_HOST,
	SECRET_DATABASE_USERNAME,
	SECRET_DATABASE_PASSWORD
} from '$env/static/private'
import { user } from '$lib/db/schema'

console.log('SECRET_DATABASE_URL', SECRET_DATABASE_HOST)

// export async function onRequestPost(context) {
const pscaleConfig = {
	host: SECRET_DATABASE_HOST,
	username: SECRET_DATABASE_USERNAME,
	password: SECRET_DATABASE_PASSWORD,
	// add the following 3 lines for @planetscale/database >= 1.7.0
	fetch: (url, init) => {
		delete init['cache']
		return fetch(url, init)
	}
}

const connection = connect(pscaleConfig)

export const db = drizzle(connection, { schema })

const query = await db.select().from(user)
console.log(query)
// }

// export const connection = connect(pscaleConfig)

// export const connection = connect({
// 	url: SECRET_DATABASE_URL
// })

// export const db = drizzle(connection, { schema })
