import type { ExportDurationTokenValue } from '../types/export-duration.value.type'
import type { DurationTokenValue } from '../types/internal-duration.value.type'

const transformToExportDurationValue = (
	duration: DurationTokenValue
): ExportDurationTokenValue => {
	const stringValue = `${duration}ms`
	const exportDurationToken = stringValue
	return exportDurationToken
}

export default transformToExportDurationValue
