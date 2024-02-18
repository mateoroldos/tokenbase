import { db } from '$lib/db'
import { designSystem } from '$lib/db/schema'

export const createDesignSystemEntry = async (
	id: string,
	name: string,
	workspaceId: string
) => {
	await db.insert(designSystem).values({
		id,
		name,
		workspaceId
	})
}
