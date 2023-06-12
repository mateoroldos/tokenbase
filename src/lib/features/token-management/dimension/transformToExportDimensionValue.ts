import type { DimensionTokenValue } from './internal-dimension-value.type'
import type { ExportDimensionTokenValue } from './export-dimension-value.type'

const transformToExportDimensionValue = (
	dimension: DimensionTokenValue
): ExportDimensionTokenValue => {
	const stringValue = `${dimension.value}${dimension.unit}`
	const dimensionToken: ExportDimensionTokenValue = stringValue

	return dimensionToken
}

export default transformToExportDimensionValue
