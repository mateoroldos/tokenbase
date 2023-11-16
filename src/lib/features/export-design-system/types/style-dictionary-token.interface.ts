import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'
import type { convertTokenValueToExportType } from '../transforms/tokenTransforms/transformTokenValueToStyleDictionaryValue'

export interface StyleDictonaryToken {
	value: ReturnType<typeof convertTokenValueToExportType>
	type: TokenType
	comment?: string
	name?: string
}
