import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'
import type { transformTokenValueToStyleDictionaryValue } from '../transforms/tokenTransforms/transformTokenValueToStyleDictionaryValue'

export interface StyleDictonaryToken {
	value: ReturnType<typeof transformTokenValueToStyleDictionaryValue>
	type: TokenType
	comment?: string
	name?: string
}
