import { addToast } from '$lib/features/toast/stores/toastStore'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type {
	IToken,
	TokenValue
} from '$lib/features/token-groups-store/types/token.interface'
import { checkIfValueIsAlias } from './checkIfValueIsAlias'

export const getAliasToken = (
	groupId: string,
	tokenId: string,
	groups: Group[],
	themeId: string
): IToken => {
	const group = groups.find((group) => group.id === groupId)

	if (group) {
		const aliasedToken: IToken | undefined = group.tokens.find(
			(token) => token.id === tokenId
		)

		if (aliasedToken && aliasedToken.value[themeId] !== undefined) {
			const aliasedTokenValue = aliasedToken.value[themeId] as TokenValue

			if (checkIfValueIsAlias(aliasedTokenValue)) {
				return getAliasToken(
					aliasedTokenValue.groupId,
					aliasedTokenValue.tokenId,
					groups,
					themeId
				)
			} else {
				return aliasedToken
			}
		} else {
			addToast(`Token with id ${tokenId} not found in group with id ${groupId}`,"error")
			throw new Error(
				`Token with id ${tokenId} not found in group with id ${groupId}`
			)
		}
	} else {
		addToast(`Group with id ${groupId} not found`,"error")
		throw new Error(`Group with id ${groupId} not found`)

	}
}
