import type { CubicBezierTokenValue } from '../../token-management/cubic-bezier/types/internal-cubic-bezier-value.type'
import type { ColorTokenValue } from '../../token-management/color/types/internal-color-value.type'
import type { DimensionTokenValue } from '../../token-management/dimension/types/internal-dimension-value.type'
import type { NumberTokenValue } from '../../token-management/number/types/internal-number-value.type'
import type { DurationTokenValue } from '../../token-management/duration/types/internal-duration.value.type'
import type { FontFamilyTokenValue } from '../../token-management/font-family/types/internal-font-family-value.type'
import type { FontWeightTokenValue } from '../../token-management/font-weight/types/internal-font-weight-value.type'

interface BaseToken<T = TokenType> {
	id: string
	name: string | undefined
	description?: string
	type: T
}

// In the internal use of the application, the token is an array of values,
// Each value corresponds to a theme of the design system
export interface IToken<T = TokenType> extends BaseToken {
	value: {
		[key in string]: TokenValue<T>
	}
}

// Some times we need to expand the token to a single value
// An example is before we transform the token to StyleDictionaryObject
// This value is the value of the token in the current theme we transforming
export interface ITokenExpanded<T = TokenType> extends BaseToken {
	value: TokenValue<T>
}

export interface ITokenWithNoAlias<T = TokenType> extends BaseToken {
	value: {
		[key in string]: TokenValueWithNoAlias<T>
	}
}

export interface ITokenWithNoId<T = TokenType> {
	name: string | undefined
	type: T
	description?: string
	value: {
		[key in string]: TokenValue<T>
	}
}

export const TOKEN_TYPES = [
	'color',
	'dimension',
	'fontFamily',
	'fontWeight',
	'duration',
	'cubicBezier',
	'number'
] as const

export type TokenType = (typeof TOKEN_TYPES)[number]

export type AliasValue = {
	groupId: string
	tokenId: string
}

export type TokenValue<T = TokenType> = T extends 'color'
	? ColorTokenValue | AliasValue
	: T extends 'dimension'
	? DimensionTokenValue | AliasValue
	: T extends 'fontFamily'
	? FontFamilyTokenValue | AliasValue
	: T extends 'fontWeight'
	? FontWeightTokenValue | AliasValue
	: T extends 'duration'
	? DurationTokenValue | AliasValue
	: T extends 'cubicBezier'
	? CubicBezierTokenValue | AliasValue
	: T extends 'number'
	? NumberTokenValue | AliasValue
	: never

export type TokenValueWithNoAlias<T = TokenType> = T extends 'color'
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
