import type { DimensionTokenValue } from '../types/internal-dimension-value.type'
import type { ExportDimensionTokenValue } from '../types/export-dimension-value.type'

const transformToExportDimensionValue = (
	dimension: DimensionTokenValue
): ExportDimensionTokenValue => {
	const stringValue = `${dimension.value}${dimension.unit}`
	const dimensionToken: ExportDimensionTokenValue = stringValue

	return dimensionToken
}

export default transformToExportDimensionValue
