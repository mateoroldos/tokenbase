import type { TokenType, TokenValue } from './types/token-interface'

export const defaultValue: { [key in TokenType]: TokenValue } = {
	color: '#000000',
	fontWeight: 'normal',
	duration: 500,
	fontFamily: 'Arial',
	dimension: '16px',
	cubicBezier: [0, 0, 0, 0],
	number: 100
}
