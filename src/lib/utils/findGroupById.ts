import type { Group } from '../features/token-groups-store/types/group.interface'

const findGroupNameById = (
	groupId: string,
	groups: Group[]
): string | undefined => {
	const group = groups.find((group) => group.id === groupId)
	return group ? group.name : undefined
}

export default findGroupNameById
