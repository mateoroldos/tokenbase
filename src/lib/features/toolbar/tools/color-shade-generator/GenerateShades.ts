import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'
import roundNumber from '$lib/utils/roundNumber'

export const generateShades = <
	T extends 'color' | 'dimension' | 'number' | 'duration'
>(
	tokenValue1: TokenValue<T>,
	tokenValue2: TokenValue<T>,
	amountOfShades: number
): TokenValue<'color' | 'dimension' | 'number' | 'duration'>[] => {
	const trueAmountOfShades = Number(amountOfShades) + 2 // We add 2 so start token and end token are included
	const shades = []

	if (
		Array.isArray(tokenValue1) &&
		Array.isArray(tokenValue2) &&
		tokenValue1.length === 3 &&
		tokenValue2.length === 3
	) {
		for (let i = 1; i < trueAmountOfShades - 1; i++) {
			const newToken: TokenValue<'color'> = [
				tokenValue1[0] +
					(tokenValue2[0] - tokenValue1[0]) * (i / (trueAmountOfShades - 1)),
				tokenValue1[1] +
					(tokenValue2[1] - tokenValue1[1]) * (i / (trueAmountOfShades - 1)),
				tokenValue1[2] +
					(tokenValue2[2] - tokenValue1[2]) * (i / (trueAmountOfShades - 1))
			]

			shades.push(newToken)
		}
	} else if (
		typeof tokenValue1 === 'number' &&
		typeof tokenValue2 === 'number'
	) {
		for (let i = 1; i < trueAmountOfShades - 1; i++) {
			const newToken = roundNumber(
				tokenValue1 +
					(tokenValue2 - tokenValue1) * (i / (trueAmountOfShades - 1)),
				1
			)

			shades.push(newToken)
		}
	} else {
		for (let i = 1; i < trueAmountOfShades - 1; i++) {
			let newToken: TokenValue<'dimension'> = {
				value: 0,
				unit: (tokenValue1 as TokenValue<'dimension'>).unit
			}

			newToken.value = roundNumber(
				(tokenValue1 as TokenValue<'dimension'>).value +
					((tokenValue2 as TokenValue<'dimension'>).value -
						(tokenValue1 as TokenValue<'dimension'>).value) *
						(i / (trueAmountOfShades - 1)),
				1
			)

			shades.push(newToken)
		}
	}

	return shades
}
