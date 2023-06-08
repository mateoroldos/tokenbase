import type {
	ColorToken,
	DimensionToken,
	FontFamilyToken,
	FontWeightToken,
	DurationToken,
	CubicBezierToken,
	NumberToken
} from '../../tokens-transformations/tokens-interfaces/tokens-interfaces'

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
