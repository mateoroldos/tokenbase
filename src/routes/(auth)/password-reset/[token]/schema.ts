import {
	MAX_PASSWORD_SIZE,
	MIN_PASSWORD_SIZE,
	PASSWORD_NUMBER_MESSAGE,
	PASSWORD_NUMBER,
	PASSWORD_LOWERCASE,
	PASSWORD_LOWERCASE_MESSAGE,
	PASSWORD_UPPERCASE,
	PASSWORD_UPPERCASE_MESSAGE
} from '$lib/features/auth/config/passwordValidators'
import { z } from 'zod'

export const formSchema = z.object({
	password: z
		.string()
		.min(MIN_PASSWORD_SIZE)
		.max(MAX_PASSWORD_SIZE)
		.refine(PASSWORD_NUMBER, PASSWORD_NUMBER_MESSAGE)
		.refine(PASSWORD_LOWERCASE, PASSWORD_LOWERCASE_MESSAGE)
		.refine(PASSWORD_UPPERCASE, PASSWORD_UPPERCASE_MESSAGE)
})

export type FormSchema = typeof formSchema