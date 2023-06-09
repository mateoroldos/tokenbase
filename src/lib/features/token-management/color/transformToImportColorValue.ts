import type { ColorToken } from './internal-color-value.type'
import { Hct } from '@material/material-color-utilities'
import Color from 'color'

const transformToImportColorValue = (hex: string): ColorToken => {
	const newArgbColor = Color(hex).rgbNumber()
	const hct = Hct.fromInt(newArgbColor)
	const colorToken: ColorToken = {
		value: [hct.hue, hct.chroma, hct.tone]
	}

	return colorToken
}

export default transformToImportColorValue
