import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type {
	AliasValue,
	IToken,
	TokenType,
	TokenValue,
	TokenValueWithNoAlias
} from '$lib/features/token-groups-store/types/token.interface'
import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'
import { checkIfValueIsAlias } from './checkIfValueIsAlias'

export let resolveAliasIdToAliasValueAndType = (
	tokenId: string,
	groupId: string,
	groups: Group[],
	activeThemeId: string
): {
	value: TokenValueWithNoAlias
	type: TokenType
} => {
	const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups) as IToken

	if (!token) {
		throw new Error(`Token with id "${tokenId}" not found`)
	}

	if (checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)) {
		const tokenAliasId = (token.value[activeThemeId] as AliasValue).tokenId
		const groupAliasId = (token.value[activeThemeId] as AliasValue).groupId

		return resolveAliasIdToAliasValueAndType(
			tokenAliasId,
			groupAliasId,
			groups,
			activeThemeId
		)
	}

	return {
		value: token.value[activeThemeId] as TokenValueWithNoAlias,
		type: token.type
	}
}
