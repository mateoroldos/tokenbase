import type { ExportDurationTokenValue } from './export-duration.value.type'
import type { DurationTokenValue } from './internal-duration.value.type'

const transformToImportDurationValue = (
	exportDuration: ExportDurationTokenValue
): DurationTokenValue => {
	const numericValue = parseInt(exportDuration)
	const durationToken = numericValue

	return durationToken
}

export default transformToImportDurationValue
