import { Hct } from '@material/material-color-utilities'
import Color from 'color'

export const generateHueBackgroundGradient = (chroma: number, tone: number) => {
	const maxAmount = 360
	const iterationSum = 10
	const iterations = maxAmount / iterationSum

	let hslArray = []

	for (let index = 0; index < iterations; index++) {
		const hue = index * iterationSum
		const argbColor = Hct.from(hue, chroma, tone).argb
		const hslColor = Color(argbColor).hsl().string()

		hslArray.push(hslColor)
	}

	const gradientString = `-webkit-linear-gradient(left, ${hslArray.join(', ')})`

	return gradientString
}

export const generateChromaBackgroundGradient = (hue: number, tone: number) => {
	const maxAmount = 100
	const iterationSum = 10
	const iterations = maxAmount / iterationSum

	let hslArray = []

	for (let index = 0; index < iterations; index++) {
		const chroma = index * iterationSum
		const argbColor = Hct.from(hue, chroma, tone).argb
		const hslColor = Color(argbColor).hsl().string()

		hslArray.push(hslColor)
	}

	const gradientString = `-webkit-linear-gradient(left, ${hslArray.join(', ')})`

	return gradientString
}

export const generateToneBackgroundGradient = (hue: number, chroma: number) => {
	const maxAmount = 100
	const iterationSum = 10
	const iterations = maxAmount / iterationSum

	let hslArray = []

	for (let index = 0; index < iterations; index++) {
		const tone = index * iterationSum
		const argbColor = Hct.from(hue, chroma, tone).argb
		const hslColor = Color(argbColor).hsl().string()

		hslArray.push(hslColor)
	}

	const gradientString = `-webkit-linear-gradient(left, ${hslArray.join(', ')})`

	return gradientString
}
