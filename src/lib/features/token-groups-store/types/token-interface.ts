export interface Token<T = TokenType> {
	id: string
	name: string
	description?: string
	value: TokenValue<T>
	type: T
}

export type TokenType =
	| 'color'
	| 'dimension'
	| 'font-family'
	| 'font-weight'
	| 'duration'
	| 'cubic-bezier'
	| 'number'
	| 'shadow'

export type TokenValue<T = TokenType> = T extends 'color'
	? string
	: T extends 'dimension'
	? string
	: T extends 'font-family'
	? string | string[]
	: T extends 'font-weight'
	? string | number
	: T extends 'duration'
	? string
	: T extends 'cubic-bezier'
	? number[]
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
