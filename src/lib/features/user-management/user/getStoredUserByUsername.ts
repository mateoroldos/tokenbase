import { db } from '$lib/db'
import { user } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export const getStoredUserByUsername = async (username: string) => {
	const [storedUser] = await db
		.select()
		.from(user)
		.where(eq(user.username, username))
	return storedUser
}
