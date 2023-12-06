import type { DimensionTokenValue } from './internal-dimension-value.type'
import type { ExportDimensionTokenValue } from './export-dimension-value.type'

const transformToImportDimensionValue = (
	exportDimension: ExportDimensionTokenValue
): DimensionTokenValue => {
	const numericValue = parseFloat(exportDimension)
	const unitMatch = exportDimension.match(/(px|rem)$/)

	if (unitMatch) {
		const unit = unitMatch[0] as 'px' | 'rem'
		const dimensionToken: DimensionTokenValue = {
			value: numericValue,
			unit: unit
		}
		return dimensionToken
	} else {
		throw new Error(`Invalid unit in exportDimension: ${exportDimension}`)
	}
}

export default transformToImportDimensionValue