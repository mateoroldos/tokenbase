import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type { IToken } from '../../token-groups-store/types/token.interface'
import { checkForAliasCircularDependency } from '../utils/checkForAliasCircularDependency'
import { resolveAliasIdToAliasType } from '../utils/resolveAliasIdToAliasType'

export const createTokenAlias = (
	token: IToken,
	activeThemeId: string,
	aliasGroupId: string,
	aliasTokenId: string,
	groups: Group[]
): IToken | undefined => {
	if (aliasTokenId !== token.id) {
		checkForAliasCircularDependency(
			groups,
			aliasGroupId,
			aliasTokenId,
			activeThemeId,
			token.id
		)

		const isAnotherTokenType =
			token.type !==
			resolveAliasIdToAliasType(aliasTokenId, aliasGroupId, groups)

		if (isAnotherTokenType) {
			alert('Cannot select a token of another type as an alias')
			return
		}

		const aliasToken: IToken = {
			...token,
			value: {
				...token.value,
				[activeThemeId]: {
					groupId: aliasGroupId,
					tokenId: aliasTokenId
				}
			},
			type: resolveAliasIdToAliasType(aliasTokenId, aliasGroupId, groups)
		}

		return aliasToken
	} else {
		alert('Cannot select the same token as its own alias')
	}
}
