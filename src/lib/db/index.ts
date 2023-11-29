import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from '$lib/db/schema'
import {
	SECRET_DATABASE_HOST,
	SECRET_DATABASE_USERNAME,
	SECRET_DATABASE_PASSWORD
} from '$env/static/private'

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

export const connection = connect(pscaleConfig)

export const db = drizzle(connection, { schema })
