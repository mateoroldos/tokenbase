import { db } from '$lib/db'
import { key } from '$lib/db/schema'
import { and, eq, isNotNull, isNull } from 'drizzle-orm'

export const getUserKeyProvider = async (
	userId: string,
	provider: 'github' | 'email'
) => {
	let user
	if (provider === 'email') {
		;[user] = await db
			.select()
			.from(key)
			.where(and(eq(key.userId, userId), isNotNull(key.hashedPassword)))
	} else if (provider === 'github') {
		;[user] = await db
			.select()
			.from(key)
			.where(and(eq(key.userId, userId), isNull(key.hashedPassword)))
	}

	return user?.id
}
