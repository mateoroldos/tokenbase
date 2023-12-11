import type { DimensionTokenValue } from '../types/internal-dimension-value.type'
import type { ExportDimensionTokenValue } from '../types/export-dimension-value.type'

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
		console.log(exportDimension)

		throw new Error(`Invalid unit in exportDimension: ${exportDimension}`)
	}
}

export default transformToImportDimensionValue
