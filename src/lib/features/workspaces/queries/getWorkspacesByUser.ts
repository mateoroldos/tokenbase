import { db } from '$lib/db'
import type { Workspace } from '../types/workspace.interface'

export const getWorkspacesByUser = async (
	userId: string
): Promise<Workspace[]> => {
	const workspaces = await db.query.workspaceMember.findMany({
		columns: {},
		where: (workspaceMember, { eq }) => eq(workspaceMember.userId, userId),
		with: {
			workspace: {
				columns: {
					id: true,
					name: true
				}
			}
		}
	})

	return workspaces.map(({ workspace }) => workspace)
}
