import { db } from '$lib/db'
import { emailToken } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateRandomString, isWithinExpiration } from 'lucia/utils'
import 'lucia/polyfill/node'

const EXPIRES_IN = 1000 * 60 * 60 * 2 // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(emailToken)
		.where(eq(emailToken.userId, userId))

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2)
		})
		if (reusableStoredToken) return reusableStoredToken.id
	}

	const token = generateRandomString(63)

	await db.insert(emailToken).values({
		id: token,
		userId: userId,
		expires: new Date().getTime() + EXPIRES_IN
	})

	return token
}