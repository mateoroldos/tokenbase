import groupsStore from '$lib/features/token-groups-store/groupsStore'
import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'
import { get } from 'svelte/store'

export const resolveIdsToAliasRoute = (
	groupId: string,
	tokenId?: string
): string | null => {
	const groups = get(groupsStore)
	const group = groups.find((group) => group.id === groupId)

	if (!group) {
		return null
	}

	let route = group.name

	if (group.parentGroup) {
		const parentRoute = resolveIdsToAliasRoute(group.parentGroup)
		if (parentRoute) {
			route = `${parentRoute}.${route}`
		}
	}

	if (tokenId) {
		const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups)
		if (token) {
			route = `{${route}.${token.name}}`
		} else {
			throw new Error(`Token with id ${tokenId} not found in group ${groupId}`)
		}
	}

	return route
}
