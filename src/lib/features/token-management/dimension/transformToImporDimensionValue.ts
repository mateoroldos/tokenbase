import type { DimensionToken } from './internal-dimension-value.type'
import type { ExportDimensionToken } from './export-dimension-value.type'

const transformToImportDimensionValue = (
	exportDimension: ExportDimensionToken
): DimensionToken => {
	const numericValue = parseFloat(exportDimension.value)
	const unit = exportDimension.value.slice(-2) as 'px' | 'rem'
	const dimensionToken: DimensionToken = {
		value: {
			value: numericValue,
			unit: unit
		}
	}

	return dimensionToken
}

export default transformToImportDimensionValue
