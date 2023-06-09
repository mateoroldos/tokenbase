import type { ExportDurationToken } from './export-duration.value.type'
import type { DurationToken } from './internal-duration.value.type'

const transformToExportDurationValue = (
	duration: DurationToken
): ExportDurationToken => {
	const stringValue = `${duration.value}ms`
	const exportDurationToken: ExportDurationToken = {
		value: stringValue
	}
	return exportDurationToken
}

export default transformToExportDurationValue
