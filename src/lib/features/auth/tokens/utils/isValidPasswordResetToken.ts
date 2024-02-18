import { db } from '$lib/db'
import { eq } from 'drizzle-orm'
import { isWithinExpiration } from 'lucia/utils'
import { passwordResetToken } from '$lib/db/schema/index'

export const isValidPasswordResetToken = async (token: string) => {
	const [storedToken] = await db
		.select()
		.from(passwordResetToken)
		.where(eq(passwordResetToken.id, token))

	if (!storedToken) return false
	const tokenExpires = Number(storedToken.expires)
	if (!isWithinExpiration(tokenExpires)) {
		return false
	}
	return true
}
