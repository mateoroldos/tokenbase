import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(1).max(120)
})

export type FormSchema = typeof formSchema
