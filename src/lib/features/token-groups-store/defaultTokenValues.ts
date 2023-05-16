import type { TokenType, TokenValue } from './types/token-interface'

type DefaultTokenValues = {
	[key in TokenType]: TokenValue<key>
}

export const defaultTokenValues: DefaultTokenValues = {
	color: [0, 0, 0],
	fontWeight: 'normal',
	duration: '500ms',
	fontFamily: 'Arial',
	dimension: '16px',
	cubicBezier: [0, 0, 0, 0],
	number: 100
}
