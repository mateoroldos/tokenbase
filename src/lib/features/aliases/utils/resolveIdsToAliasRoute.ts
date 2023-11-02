import groupsStore from '$lib/features/token-groups-store/groups'
import { get } from 'svelte/store'

export const resolveIdsToAliasRoute = (
	groupId: string,
	tokenId?: string
): `{${string}}` | null => {
	const group = get(groupsStore).find((group) => group.id === groupId)

	if (!group) return null

	const token = group.tokens.find((token) => token.id === tokenId)

	if (!token) return null

	const parentRoute = group.parentGroup
		? resolveIdsToAliasRoute(group.parentGroup)
		: null

	if (parentRoute) {
		return `{${parentRoute}.${group.name}.${token.name}}`
	} else {
		return `{${parentRoute}.${group.name}}`
	}
}
