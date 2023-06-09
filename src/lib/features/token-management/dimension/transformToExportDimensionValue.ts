import type { DimensionToken } from './internal-dimension-value.type'
import type { ExportDimensionToken } from './export-dimension-value.type'

const transformToExportDimensionValue = (
	dimension: DimensionToken
): ExportDimensionToken => {
	const stringValue = `${dimension.value.value}${dimension.value.unit}`
	const dimensionToken: ExportDimensionToken = {
		value: stringValue
	}
	return dimensionToken
}

export default transformToExportDimensionValue
