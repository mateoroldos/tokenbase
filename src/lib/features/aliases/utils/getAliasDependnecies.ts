import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
import type {
	IToken,
	TokenValue
} from '$lib/features/token-groups-store/types/token.interface'
import { checkIfValueIsAlias, type AliasValue } from './checkIfValueIsAlias'

export const getAliasDependencies = (tokens: IToken[], theme: Theme) => {
	const aliasTokens = tokens.filter((token) => {
		return checkIfValueIsAlias(token.value[theme.id as string] as TokenValue)
	})

	if (!aliasTokens) {
		return []
	}

	return aliasTokens.map((token) => {
		const aliasValue = token.value[theme.id as string] as AliasValue

		return [token.id, aliasValue.tokenId]
	})
}
