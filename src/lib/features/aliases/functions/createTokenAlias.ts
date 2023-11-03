import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type { IToken } from '../../token-groups-store/types/token.interface'
import { checkForAliasCircularDependency } from '../utils/checkForAliasCircularDependency'
import type { AliasValue } from '../utils/checkIfValueIsAlias'
import { resolveAliasIdToAliasType } from '../utils/resolveAliasIdToAliasType'

export const createTokenAlias = (
	token: IToken,
	activeThemeId: string,
	aliasGroupId: string,
	aliasTokenId: string,
	groups: Group[]
) => {
	if (aliasTokenId !== token.id) {
		checkForAliasCircularDependency(
			groups,
			aliasGroupId,
			aliasTokenId,
			activeThemeId,
			token.id
		)

		token.value[activeThemeId] = {
			groupId: aliasGroupId,
			tokenId: aliasTokenId
		} as AliasValue

		token.type = resolveAliasIdToAliasType(aliasTokenId, aliasGroupId, groups)
	} else {
		alert('Cannot select the same token as its own alias')
	}
}
