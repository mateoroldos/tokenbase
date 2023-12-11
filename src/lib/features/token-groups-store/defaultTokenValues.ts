import type { TokenType, TokenValue } from './types/token.interface'

type DefaultTokenValues = {
	[key in TokenType]: TokenValue<key>
}

export const getDefaultTokenValues = (
	value: TokenType
): TokenValue<typeof value> => {
	if (value === 'color') {
		return [0, 0, 0]
	} else if (value === 'fontWeight') {
		return 'medium'
	} else if (value === 'duration') {
		return 500
	} else if (value === 'fontFamily') {
		return ['Arial']
	} else if (value === 'dimension') {
		return { value: 16, unit: 'px' }
	} else if (value === 'cubicBezier') {
		return [0, 0, 0, 0]
	} else if (value === 'number') {
		return 100
	} else {
		return [10, 10, 10]
	}
}
