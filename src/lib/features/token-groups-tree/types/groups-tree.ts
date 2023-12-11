import type { Group } from '$lib/features/token-groups-store/types/group.interface'

export interface GroupsTree {
	group?: Group
	children: GroupsTree[]
}
