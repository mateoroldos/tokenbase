import type { CubicBezierToken } from '../../token-management/cubic-bezier/internal-cubic-bezier-value.type'
import type { ColorToken } from '../../token-management/color/internal-color-value.type'
import type { DimensionToken } from '../../token-management/dimension/internal-dimension-value.type'
import type { NumberToken } from '../../token-management/number/internal-number-value.type'
import type { DurationToken } from '../../token-management/duration/internal-duration.value.type'
import type { FontFamilyToken } from '../../token-management/font-family/internal-font-family-value.type'
import type { FontWeightToken } from '../../token-management/font-weight/internal-font-weight-value.type'

export interface IToken<T = TokenType> {
	id: string
	name: string | undefined
	description?: string
	value: TokenValue<T>
	type: T
}

export interface DefaultToken<T = TokenType> {
	name: undefined | null
	value: TokenValue<T>
	type: T
}

export type TokenType =
	| 'color'
	| 'dimension'
	| 'fontFamily'
	| 'fontWeight'
	| 'duration'
	| 'cubicBezier'
	| 'number'

export type TokenValue<T = TokenType> = T extends 'color'
	? ColorToken
	: T extends 'dimension'
	? DimensionToken
	: T extends 'fontFamily'
	? FontFamilyToken
	: T extends 'fontWeight'
	? FontWeightToken
	: T extends 'duration'
	? DurationToken
	: T extends 'cubicBezier'
	? CubicBezierToken
	: T extends 'number'
	? NumberToken
	: never
