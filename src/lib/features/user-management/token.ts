import { db } from '$lib/db'
import { emailToken } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateRandomString, isWithinExpiration } from 'lucia/utils'

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

/* export const generatePasswordResetToken = async (userId: string) => {
	const storedUserTokens = await db
		.selectFrom('password_reset_token')
		.selectAll()
		.where('user_id', '=', userId)
		.execute();
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db
		.insertInto('password_reset_token')
		.values({
			id: token,
			expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId
		})
		.executeTakeFirst();
	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.transaction().execute(async (trx) => {
		const storedToken = await trx
			.selectFrom('password_reset_token')
			.selectAll()
			.where('id', '=', token)
			.executeTakeFirst();
		if (!storedToken) throw new Error('Invalid token');
		await trx.deleteFrom('password_reset_token').where('id', '=', token).executeTakeFirst();
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};

export const isValidPasswordResetToken = async (token: string) => {
	const storedToken = await db
		.selectFrom('password_reset_token')
		.selectAll()
		.where('id', '=', token)
		.executeTakeFirst();
	if (!storedToken) return false;
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		return false;
	}
	return true;
}; */
