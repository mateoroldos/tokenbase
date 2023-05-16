import type { IToken, TokenType } from './token-interface'

export interface Group {
	id: string
	name: string
	description?: string
	parentGroup: string | undefined
	type: TokenType | 'custom'
	tokens: IToken[]
}
