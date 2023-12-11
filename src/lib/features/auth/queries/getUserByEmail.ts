import { db } from '$lib/db'
import { user } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: string) => {
	const [storedUser] = await db.select().from(user).where(eq(user.email, email))

	return storedUser
}
