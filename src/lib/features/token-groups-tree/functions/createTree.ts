import type { Group } from '$lib/features/token-groups-store/types/group-interface';
import type { GroupsTree } from '../types/groups-tree';

const buildSubTree = (groups: Group[], parentId?: string): GroupsTree[] => {
	const nodes: GroupsTree[] = [];

	groups.forEach((group) => {
		if (group.parentGroup === parentId) {
			const node: GroupsTree = { group, children: [] };
			const children = buildSubTree(groups, group.id);

			node.children = children;

			nodes.push(node);
		}
	});

	return nodes;
};

const createTree = (groups: Group[]): GroupsTree => {
	const rootGroup = groups.find((group) => group.id === 'root');

	if (!rootGroup) {
		throw new Error('Root group not found');
	}

	const root: GroupsTree = { group: rootGroup, children: [] };
	const children = buildSubTree(groups, 'root');

	root.children = children;

	return root;
};

export default createTree;
