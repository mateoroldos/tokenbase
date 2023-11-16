import type { ColorTokenValue } from '../types/internal-color-value.type'
import { Hct } from '@material/material-color-utilities'
import Color from 'color'

const transformToImportColorValue = (hex: string): ColorTokenValue => {
	const newArgbColor = Color(hex).rgbNumber()
	const hct = Hct.fromInt(newArgbColor)
	const value: ColorTokenValue = [hct.hue, hct.chroma, hct.tone]

	return value
}

export default transformToImportColorValue
