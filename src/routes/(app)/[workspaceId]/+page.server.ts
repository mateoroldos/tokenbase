import { createDesignSystemEntry } from '$lib/features/workspaces/functions/createDesignSystemEntry.js'
import { v4 as uuidv4 } from 'uuid'
import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { formSchema } from './schema.js'
import type { Actions } from './$types'

export const load = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) throw redirect(302, '/login')

	return {
		userId: session.user.userId,
		email: session.user.email,
		form: await superValidate(formSchema)
	}
}

export const actions: Actions = {
	addDesignSystem: async (event) => {
		const session = await event.locals.auth.validate()
		if (!session) throw redirect(302, '/login')

		const form = await superValidate(event, formSchema)
		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const { workspaceId } = event.params
		const uuid = uuidv4()

		try {
			await createDesignSystemEntry(uuid, form.data.name, workspaceId)
		} catch (error) {
			return message(
				form,
				{ type: 'error', text: 'An unknown error occured.' },
				{
					status: 500
				}
			)
		}

		return {
			form,
			success: true,
			id: uuid,
			name: form.data.name
		}
	}
}
