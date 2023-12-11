import type { ColorTokenValue } from '../types/internal-color-value.type'

export const checkIfValueIsColorToken = (
	value: any
): value is ColorTokenValue =>
	Array.isArray(value) &&
	value.length === 3 &&
	value.every((num) => typeof num === 'number')
