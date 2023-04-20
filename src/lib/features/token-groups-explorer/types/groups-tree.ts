import type { Group } from '$lib/types/group-interface';

export interface GroupsTree {
	group: Group;
	children: GroupsTree[];
}
