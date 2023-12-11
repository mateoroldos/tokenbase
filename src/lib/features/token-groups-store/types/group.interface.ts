import type { IToken, ITokenExpanded, TokenType } from './token.interface'

interface BaseGroup {
	id: string
	name: string
	description?: string
	parentGroup: string | undefined
	type?: TokenType | undefined
}

export interface Group extends BaseGroup {
	tokens: IToken[]
}

export interface GroupExpanded extends BaseGroup {
	tokens: ITokenExpanded[]
}
