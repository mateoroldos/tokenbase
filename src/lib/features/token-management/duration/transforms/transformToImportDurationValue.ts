import type { ExportDurationTokenValue } from '../types/export-duration.value.type'
import type { DurationTokenValue } from '../types/internal-duration.value.type'

const transformToImportDurationValue = (
	exportDuration: ExportDurationTokenValue
): DurationTokenValue => {
	const numericValue = parseInt(exportDuration)
	const durationToken = numericValue

	return durationToken
}

export default transformToImportDurationValue
