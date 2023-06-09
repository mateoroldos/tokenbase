import type { ExportColorToken } from './export-color-value.type'
import type { ColorToken } from './internal-color-value.type'
import { Hct } from '@material/material-color-utilities'
import Color from 'color'

const transformToExportColorValue = (color: ColorToken): ExportColorToken => {
	const h = color.value[0]
	const c = color.value[1]
	const t = color.value[2]
	const argb = Hct.from(h, c, t).argb
	const hex = Color(argb).hex()
	return {
		value: hex
	}
}

export default transformToExportColorValue
