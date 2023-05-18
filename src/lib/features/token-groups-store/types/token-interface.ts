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
	? [number, number, number]
	: T extends 'dimension'
	? {
			value: number
			unit: 'px' | 'rem'
	  }
	: T extends 'fontFamily'
	? string[]
	: T extends 'fontWeight'
	? string | number
	: T extends 'duration'
	? number
	: T extends 'cubicBezier'
	? [number, number, number, number]
	: T extends 'number'
	? number
	: T extends 'shadow'
	? {
			color: string
			offsetX: string
			offsetY: string
			blur: string
			spread: string
	  }
	: never
