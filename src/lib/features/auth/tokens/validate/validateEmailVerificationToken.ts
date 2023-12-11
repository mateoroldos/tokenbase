import { db } from '$lib/db'
import { emailToken } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { isWithinExpiration } from 'lucia/utils'

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const [storedToken] = await tx
			.select()
			.from(emailToken)
			.where(eq(emailToken.id, token))

		if (!storedToken) throw new Error('Invalid token')

		await tx.delete(emailToken).where(eq(emailToken.userId, storedToken.userId))

		return storedToken
	})

	const tokenExpires = Number(storedToken.expires) // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token')
	}
	return storedToken.userId
}
