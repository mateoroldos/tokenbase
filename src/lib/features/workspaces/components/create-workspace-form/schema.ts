import { z } from 'zod'

export const formSchemaServer = z.object({
	name: z.string().min(3).max(50),
	id: z
		.string()
		.regex(/^[a-zA-Z0-9-]+$/)
		.min(3)
		.max(50)
})

export const formSchemaClient = z.object({
	name: z.string().min(3).max(50),
	id: z
		.string()
		.regex(/^[a-zA-Z0-9-]+$/)
		.min(3)
		.max(50)
})

export type FormSchemaServer = typeof formSchemaServer
export type FormSchemaClient = typeof formSchemaClient
