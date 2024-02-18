import { db } from '$lib/db'

export const getWorkspacesByUser = async (userId: string) => {
	const workspaces = await db.query.workspaceMember.findMany({
		columns: {},
		where: (workspaceMember, { eq }) => eq(workspaceMember.userId, userId),
		with: {
			workspace: true
		}
	})

	return workspaces.map(({ workspace }) => workspace)
}
