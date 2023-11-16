import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'
import { checkIfValueIsAlias, type AliasValue } from './checkIfValueIsAlias'

export const deepResolveAliasIds = (
	groupId: string,
	tokenId: string,
	groups: Group[],
	themeId: string
): {
	groupId: string
	tokenId: string
} => {
	const group = groups.find((group) => group.id === groupId)
	if (!group) {
		return { groupId, tokenId }
	}

	const token = group.tokens.find((token) => token.id === tokenId)
	if (!token || token.value[themeId] === undefined) {
		return { groupId, tokenId }
	}

	if (checkIfValueIsAlias(token.value[themeId] as TokenValue)) {
		const { groupId: newGroupId, tokenId: newTokenId } = token.value[
			themeId
		] as AliasValue
		return deepResolveAliasIds(newGroupId, newTokenId, groups, themeId)
	} else {
		return { groupId, tokenId }
	}
}
