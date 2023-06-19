import type { CubicBezierTokenValue } from '../../token-management/cubic-bezier/internal-cubic-bezier-value.type'
import type { ColorTokenValue } from '../../token-management/color/internal-color-value.type'
import type { DimensionTokenValue } from '../../token-management/dimension/internal-dimension-value.type'
import type { NumberTokenValue } from '../../token-management/number/internal-number-value.type'
import type { DurationTokenValue } from '../../token-management/duration/internal-duration.value.type'
import type { FontFamilyTokenValue } from '../../token-management/font-family/internal-font-family-value.type'
import type { FontWeightTokenValue } from '../../token-management/font-weight/internal-font-weight-value.type'

export interface IToken<T = TokenType> {
	id: string
	name: string | undefined
	description?: string
	value?: TokenValue<T>
	type?: T

	alias?: {
		groupId: string
		tokenId: string
	}
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
	? ColorTokenValue
	: T extends 'dimension'
	? DimensionTokenValue
	: T extends 'fontFamily'
	? FontFamilyTokenValue
	: T extends 'fontWeight'
	? FontWeightTokenValue
	: T extends 'duration'
	? DurationTokenValue
	: T extends 'cubicBezier'
	? CubicBezierTokenValue
	: T extends 'number'
	? NumberTokenValue
	: never
