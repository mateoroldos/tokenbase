import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { message, superValidate } from 'sveltekit-superforms/server'
import { formSchemaServer } from '$lib/features/workspaces/components/create-workspace-form/schema.js'
import { createWorkspaceEntry } from '$lib/features/workspaces/functions/createWorkspaceEntry'

export let prerender = false

export const load = async ({ locals, url, fetch, parent }) => {
	const session = await locals.auth.validate()
	const parentData = await parent()

	if (!session) {
		const postRes = await fetch(`${url.origin}/api/blog/posts.json`)

		const posts = (await postRes.json()).slice(0, 3)

		return { posts }
	}

	if (
		parentData.workspaces &&
		parentData.workspaces.length > 0 &&
		parentData.workspaces[0]
	) {
		throw redirect(302, `/${parentData.workspaces[0].id}`)
	}

	return {
		form: await superValidate(formSchemaServer)
	}
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
			await createWorkspaceEntry(
				session.user.userId,
				form.data.id,
				form.data.name
			)
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
