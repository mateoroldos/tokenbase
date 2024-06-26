import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'

export type AliasValue = {
	groupId: string
	tokenId: string
}

export const checkIfValueIsAlias = (value: TokenValue): value is AliasValue => {
	return (
		typeof value === 'object' &&
		value.hasOwnProperty('groupId') &&
		value.hasOwnProperty('tokenId')
	)
}
