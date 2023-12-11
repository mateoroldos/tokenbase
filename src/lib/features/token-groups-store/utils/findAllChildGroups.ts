import type { Group } from '../types/group.interface'

export const findAllChildGroups = (
	groups: Group[],
	parentGroupId: string
): Group[] => {
	const childGroups = groups.filter(
		(group) => group.parentGroup === parentGroupId
	)
	if (childGroups.length === 0) {
		return []
	}
	return childGroups.flatMap((group) => [
		group,
		...findAllChildGroups(groups, group.id)
	])
}
