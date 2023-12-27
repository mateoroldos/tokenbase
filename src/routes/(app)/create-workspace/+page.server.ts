import { formSchemaServer } from '$lib/features/workspaces/components/create-workspace-form/schema.js'
import { createWorkspace } from '$lib/features/workspaces/functions/createWorkspace.js'
import { redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import type { Actions } from './$types'

export const load = async ({ locals, url, fetch }) => {
	const session = await locals.auth.validate()

	if (!session) throw redirect(302, '/login')
}

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.auth.validate()

		if (!session) {
			throw redirect(302, '/login')
		}

		const form = await superValidate(event, formSchemaServer)

		if (!form.valid) {
			return form
		}

		try {
			await createWorkspace(session.user.userId, form.data.id, form.data.name)
		} catch (error) {
			if (error.message.includes('Duplicate entry')) {
				return message(
					form,
					{ type: 'error', text: 'Workspace id already exists' },
					{
						status: 403
					}
				)
			}

			return message(
				form,
				{ type: 'error', text: 'Error creating workspace' },
				{
					status: 403
				}
			)
		}

		throw redirect(302, `/${form.data.id}`)
	}
}
