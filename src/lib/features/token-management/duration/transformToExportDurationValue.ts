import type { ExportDurationTokenValue } from './export-duration.value.type'
import type { DurationTokenValue } from './internal-duration.value.type'

const transformToExportDurationValue = (
	duration: DurationTokenValue
): ExportDurationTokenValue => {
	const stringValue = `${duration}ms`
	const exportDurationToken = stringValue
	return exportDurationToken
}

export default transformToExportDurationValue
