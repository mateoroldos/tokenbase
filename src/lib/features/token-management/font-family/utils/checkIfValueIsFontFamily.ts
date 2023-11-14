import type { FontFamilyTokenValue } from '../types/internal-font-family-value.type'

export const checkIfValueIsFontFamilyToken = (
	value: any
): value is FontFamilyTokenValue =>
	Array.isArray(value) && value.every((item) => typeof item === 'string')
