import { db } from '$lib/db'
import { user } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export const getStoredUserByEmail = async (email: string) => {
	console.log('getting user')

	console.log('db', db)

	const [storedUser] = await db.select().from(user).where(eq(user.email, email))
	console.log('storedUser', storedUser)

	return storedUser
}
