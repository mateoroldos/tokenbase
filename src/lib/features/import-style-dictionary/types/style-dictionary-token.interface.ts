import type {
	TokenType,
	TokenValue
} from '$lib/features/token-groups-store/types/token-interface'

export interface StyleDictionaryToken {
	value: TokenValue<TokenType>
	comment?: string
	type: TokenType
}
