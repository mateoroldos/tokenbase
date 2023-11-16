import type { NumberTokenValue } from '../types/internal-number-value.type'

export const checkIfValueIsNumberToken = (
	value: any
): value is NumberTokenValue =>
	typeof value === 'number' || typeof value === 'string'
