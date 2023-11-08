import { db } from '$lib/db'
import { user } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export const verifyUniqueUsername = async (username: string) => {
	const usernameExist = await db
		.select()
		.from(user)
		.where(eq(user.username, username))

	if (usernameExist.length > 0) {
		return true
	} else {
		return false
	}
}

export const getStoredUser = async (email: string) => {
	const [storedUser] = await db.select().from(user).where(eq(user.email, email))
	return storedUser
}
