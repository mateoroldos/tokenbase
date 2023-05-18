import type { TokenType, TokenValue } from './types/token-interface'

type DefaultTokenValues = {
	[key in TokenType]: TokenValue<key>
}

export const defaultTokenValues: DefaultTokenValues = {
	color: [0, 0, 0],
	fontWeight: 'normal',
	duration: 500,
	fontFamily: ['Arial'],
	dimension: { value: 16, unit: 'px' },
	cubicBezier: [0, 0, 0, 0],
	number: 100
}
