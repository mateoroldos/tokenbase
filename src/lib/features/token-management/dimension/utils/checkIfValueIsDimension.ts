import type { DimensionTokenValue } from '../types/internal-dimension-value.type'

export const checkIfValueIsDimensionToken = (
	value: any
): value is DimensionTokenValue => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'value' in value &&
		(typeof value.value === 'number' || typeof value.value === 'string') &&
		'unit' in value &&
		(value.unit === 'px' || value.unit === 'rem')
	)
}
