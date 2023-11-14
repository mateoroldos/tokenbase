import type { FontWeightTokenValue } from '../types/internal-font-weight-value.type'

export const checkIfValueIsFontWeightToken = (
	value: any
): value is FontWeightTokenValue =>
	typeof value === 'string' || typeof value === 'number'
