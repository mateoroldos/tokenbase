import type { TokenValue } from '$lib/features/token-groups-store/types/token-interface'

export const generateColorShades = (
	color1: TokenValue<'color'>,
	color2: TokenValue<'color'>,
	amountOfShades: number
): TokenValue<'color'>[] => {
	const trueAmountOfShades = amountOfShades + 2 // We add 2 so start color and end color are included
	const colorShades = []

	for (let i = 1; i < trueAmountOfShades - 1; i++) {
		const color: TokenValue<'color'> = [
			color1[0] + (color2[0] - color1[0]) * (i / (trueAmountOfShades - 1)),
			color1[1] + (color2[1] - color1[1]) * (i / (trueAmountOfShades - 1)),
			color1[2] + (color2[2] - color1[2]) * (i / (trueAmountOfShades - 1))
		]

		colorShades.push(color)
	}

	return colorShades
}
