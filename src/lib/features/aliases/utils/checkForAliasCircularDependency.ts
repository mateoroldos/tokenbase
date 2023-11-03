import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type {
	AliasValue,
	TokenValue
} from '$lib/features/token-groups-store/types/token.interface'
import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'
import { checkIfValueIsAlias } from './checkIfValueIsAlias'

export const checkForAliasCircularDependency = (
	groups: Group[],
	aliasGroupId: string,
	aliasTokenId: string,
	activeThemeId: string,
	rootTokenId: string | null,
	visitedTokens: Set<string> = new Set()
): void => {
	const currentTokenId = rootTokenId ?? aliasTokenId

	if (visitedTokens.has(currentTokenId)) {
		alert('Could not create alias. Circular dependency detected.')
		throw new Error('Circular dependency detected in the alias path')
	}

	visitedTokens.add(currentTokenId)

	const token = findTokenByGroupIdAndTokenId(aliasGroupId, aliasTokenId, groups)

	if (token && checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)) {
		const { tokenId: dependentTokenId, groupId: dependentGroupId } = token
			.value[activeThemeId] as AliasValue
		checkForAliasCircularDependency(
			groups,
			dependentGroupId,
			dependentTokenId,
			activeThemeId,
			null,
			visitedTokens
		)
	}

	visitedTokens.delete(currentTokenId) // Backtrack while unwinding the recursion
}
