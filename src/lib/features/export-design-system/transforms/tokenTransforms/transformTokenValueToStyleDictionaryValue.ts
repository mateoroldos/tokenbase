import type {
	TokenType,
	TokenValueWithNoAlias
} from '$lib/features/token-groups-store/types/token.interface'
import type { ColorTokenValue } from '$lib/features/token-management/color/types/internal-color-value.type'
import transformToExportColorValue from '$lib/features/token-management/color/transforms/transformToExportColorValue'
import type { DimensionTokenValue } from '$lib/features/token-management/dimension/types/internal-dimension-value.type'
import transformToExportDimensionValue from '$lib/features/token-management/dimension/transforms/transformToExportDimensionValue'
import type { DurationTokenValue } from '$lib/features/token-management/duration/types/internal-duration.value.type'
import transformToExportDurationValue from '$lib/features/token-management/duration/transforms/transformToExportDurationValue'

export const transformTokenValueToStyleDictionaryValue = <T extends TokenType>(
	value: TokenValueWithNoAlias<T>,
	type: T
) => {
	switch (type) {
		case 'color':
			return transformColorValue(value as ColorTokenValue)
		case 'dimension':
			return transformDimensionValue(value as DimensionTokenValue)
		case 'fontFamily':
			return transformFontFamilyValue(value)
		case 'fontWeight':
			return transformFontWeightValue(value)
		case 'duration':
			return transformDurationValue(value as DurationTokenValue)
		case 'cubicBezier':
			return transformCubicBezierValue(
				value as [number, number, number, number]
			)
		case 'number':
			return transformNumberValue(value)
		default:
			return null
	}
}

function transformColorValue(value: ColorTokenValue): unknown {
	return transformToExportColorValue(value)
}

function transformDimensionValue(value: DimensionTokenValue): unknown {
	return transformToExportDimensionValue(value)
}

function transformFontFamilyValue(value: unknown): unknown {
	// Transformation logic for font family
	// Implement as needed
	return value
}

function transformFontWeightValue(value: unknown): unknown {
	// Transformation logic for font weight
	// Implement as needed
	return value
}

function transformDurationValue(value: DurationTokenValue): unknown {
	return transformToExportDurationValue(value)
}

function transformCubicBezierValue(
	value: [number, number, number, number]
): unknown {
	const [x1, y1, x2, y2] = value
	return { x1, y1, x2, y2 }
}

function transformNumberValue(value: unknown): unknown {
	// Transformation logic for number
	// Implement as needed
	return value
}
