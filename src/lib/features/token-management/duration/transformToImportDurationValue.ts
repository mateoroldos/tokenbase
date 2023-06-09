import type { ExportDurationToken } from './export-duration.value.type'
import type { DurationToken } from './internal-duration.value.type'

const transformToImportDurationValue = (
	exportDuration: ExportDurationToken
): DurationToken => {
	const numericValue = parseInt(exportDuration.value)
	const durationToken: DurationToken = {
		value: numericValue
	}

	return durationToken
}

export default transformToImportDurationValue
