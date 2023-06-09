import type { ExportColorTokenValue } from './export-color-value.type'
import type { ColorTokenValue } from './internal-color-value.type'
import { Hct } from '@material/material-color-utilities'
import Color from 'color'

const transformToExportColorValue = (
	color: ColorTokenValue
): ExportColorTokenValue => {
	const h = color[0]
	const c = color[1]
	const t = color[2]
	const argb = Hct.from(h, c, t).argb
	const hex = Color(argb).hex()

	return hex
}

export default transformToExportColorValue
