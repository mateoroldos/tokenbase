import type { DurationTokenValue } from '../types/internal-duration.value.type'

export const checkIfValueIsDurationToken = (
	value: any
): value is DurationTokenValue =>
	typeof value === 'number' || typeof value === 'string'
