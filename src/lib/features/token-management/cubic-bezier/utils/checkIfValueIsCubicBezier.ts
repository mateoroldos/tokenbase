import type { CubicBezierTokenValue } from '../types/internal-cubic-bezier-value.type'

export const checkIfValueIsCubicBezier = (
	value: any
): value is CubicBezierTokenValue =>
	Array.isArray(value) &&
	value.length === 4 &&
	value.every((num) => typeof num === 'number' || typeof num === 'string')
