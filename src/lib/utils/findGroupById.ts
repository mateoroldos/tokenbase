import type { Group } from '../features/token-groups-store/types/group.interface'

export const findGroupById = (
	groupId: string,
	groups: Group[]
): Group | null => {
	const group = groups.find((group) => group.id === groupId)

	return group ?? null
}
