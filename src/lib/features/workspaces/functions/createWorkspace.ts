import { db } from '$lib/db'
import { workspace, workspaceMember } from '$lib/db/schema'

export const createWorkspace = async (
	userId: string,
	workspaceId: string,
	workspaceName: string
) => {
	await db.transaction(async (tx) => {
		await tx
			.insert(workspace)
			.values({ id: workspaceId, name: workspaceName, ownerId: userId })
		await tx.insert(workspaceMember).values({ userId, workspaceId })
	})
}
