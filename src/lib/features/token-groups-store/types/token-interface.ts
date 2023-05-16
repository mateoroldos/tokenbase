export interface Token<T = TokenType> {
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
	? string
	: T extends 'fontFamily'
	? string | string[]
	: T extends 'fontWeight'
	? string | number
	: T extends 'duration'
	? string
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
