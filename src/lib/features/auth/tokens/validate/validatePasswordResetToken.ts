import { db } from '$lib/db'
import { eq } from 'drizzle-orm'
import { isWithinExpiration } from 'lucia/utils'
import { passwordResetToken } from '$lib/db/schema/index'

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const [storedToken] = await tx
			.select()
			.from(passwordResetToken)
			.where(eq(passwordResetToken.id, token))

		if (!storedToken) throw new Error('Invalid token')
		await tx.delete(passwordResetToken).where(eq(passwordResetToken.id, token))

		return storedToken
	})

	const tokenExpires = Number(storedToken.expires)
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token')
	}
	return storedToken.userId
}
