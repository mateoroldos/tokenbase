import { checkIfValueIsAlias } from '$lib/features/aliases/utils/checkIfValueIsAlias'
import { resolveIdsToAliasRoute } from '$lib/features/aliases/utils/resolveIdsToAliasRoute'
import type { StyleDictionaryToken } from '$lib/features/import-style-dictionary/types/style-dictionary-token.interface'
import type {
	AliasValue,
	ITokenExpanded,
	TokenValue
} from '$lib/features/token-groups-store/types/token.interface'
import { transformTokenValueToStyleDictionaryValue } from './transformTokenValueToStyleDictionaryValue'

export const transformTokenToStyleDictionaryToken = (
	tokens: ITokenExpanded[]
): { [key: string]: StyleDictionaryToken } => {
	const dictionary: { [key: string]: StyleDictionaryToken } = {}

	tokens.forEach((token) => {
		const { name, value, type, description } = token

		const transformedValue = checkIfValueIsAlias(value)
			? resolveIdsToAliasRoute(
					(value as AliasValue).groupId,
					(value as AliasValue).tokenId
			  )
			: transformTokenValueToStyleDictionaryValue(value, type)

		const dictionaryToken: StyleDictionaryToken = {
			value: transformedValue as TokenValue,
			comment: description,
			type: type
		}

		const tokenName = name ?? 'undefined' // Handle potential undefined names

		dictionary[tokenName] = dictionaryToken
	})

	return dictionary
}
