import { getWorkspacesByUser } from '$lib/features/workspaces/queries/getWorkspacesByUser.js'

export const load = async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session) {
		return {
			workspaces: []
		}
	}

	return {
		workspaces: await getWorkspacesByUser(session.user.userId)
	}
}
