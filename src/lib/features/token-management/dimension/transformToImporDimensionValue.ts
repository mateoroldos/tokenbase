import type { DimensionTokenValue } from './internal-dimension-value.type'
import type { ExportDimensionTokenValue } from './export-dimension-value.type'

const transformToImportDimensionValue = (
	exportDimension: ExportDimensionTokenValue
): DimensionTokenValue => {
	const numericValue = parseFloat(exportDimension)
	const unit = exportDimension.slice(-2) as 'px' | 'rem'
	const dimensionToken: DimensionTokenValue = {
		value: numericValue,
		unit: unit
	}

	return dimensionToken
}

export default transformToImportDimensionValue
