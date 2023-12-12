import { z } from 'zod'
import {
	MAX_PASSWORD_SIZE,
	MIN_PASSWORD_SIZE,
	PASSWORD_LOWERCASE,
	PASSWORD_LOWERCASE_MESSAGE,
	PASSWORD_NUMBER,
	PASSWORD_NUMBER_MESSAGE,
	PASSWORD_UPPERCASE,
	PASSWORD_UPPERCASE_MESSAGE
} from '$lib/features/auth/config/passwordValidators'

export const formSchemaServer = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(MIN_PASSWORD_SIZE)
		.max(MAX_PASSWORD_SIZE)
		.refine(PASSWORD_UPPERCASE, PASSWORD_UPPERCASE_MESSAGE)
		.refine(PASSWORD_LOWERCASE, PASSWORD_LOWERCASE_MESSAGE)
		.refine(PASSWORD_NUMBER, PASSWORD_NUMBER_MESSAGE)
})

export const formSchemaClient = z.object({
	email: z.string().email(),
	password: z.string()
})

export type FormSchemaServer = typeof formSchemaServer
export type FormSchemaClient = typeof formSchemaClient
