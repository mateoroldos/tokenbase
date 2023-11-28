import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
import type {
	IToken,
	ITokenWithNoId,
	TokenValue,
	TokenValueWithNoAlias
} from '$lib/features/token-groups-store/types/token.interface'
import { checkIfValueIsDimensionToken } from '$lib/features/token-management/dimension/utils/checkIfValueIsDimension'
import { checkIfValueIsNumberToken } from '$lib/features/token-management/number/utils/checkIfValueIsNumber'
import { checkIfValueIsColorToken } from '$lib/features/token-management/color/utils/checkIfValueIsColor'
import type { ColorTokenValue } from '$lib/features/token-management/color/types/internal-color-value.type'
import type { NumberTokenValue } from '$lib/features/token-management/number/types/internal-number-value.type'
import type { DimensionTokenValue } from '$lib/features/token-management/dimension/types/internal-dimension-value.type'
import roundNumber from '$lib/utils/roundNumber'
import { checkIfValueIsAlias } from '$lib/features/aliases/utils/checkIfValueIsAlias'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import { resolveAliasIdToAliasValueAndType } from '$lib/features/aliases/utils/resolveAliasIdToAliasValueAndType'
import { addToast } from '$lib/features/toast/stores/toastStore'

export const generateTokenShades = (
	token1: IToken,
	token2: IToken,
	themes: Theme[],
	amountOfShades: number,
	groups: Group[]
): ITokenWithNoId[] => {
	const tokens: ITokenWithNoId<
		'color' | 'dimension' | 'number' | 'duration'
	>[] = []

	themes.forEach((theme, index) => {
		let tokenValue1 = token1.value[theme.id]
		let tokenValue2 = token2.value[theme.id]

		if (tokenValue1 && checkIfValueIsAlias(tokenValue1)) {
			tokenValue1 = resolveAliasIdToAliasValueAndType(
				tokenValue1.tokenId,
				tokenValue1.groupId,
				groups,
				theme.id
			).value
		}

		if (tokenValue2 && checkIfValueIsAlias(tokenValue2)) {
			tokenValue2 = resolveAliasIdToAliasValueAndType(
				tokenValue2.tokenId,
				tokenValue2.groupId,
				groups,
				theme.id
			).value
		}

		if (
			tokenValue1 &&
			tokenValue2 &&
			checkIfValuesAreValidForShade(tokenValue1, tokenValue2)
		) {
			const shades = generateShades(
				tokenValue1 as TokenValueWithNoAlias<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				tokenValue2 as TokenValueWithNoAlias<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				amountOfShades
			)

			if (index === 0) {
				shades.forEach((shade, index) => {
					const shadeToken: ITokenWithNoId<
						'color' | 'dimension' | 'number' | 'duration'
					> = {
						name: `${token1.name}-${token2.name}-shade-${index + 1}`,
						value: {
							[theme.id]: shade
						},
						type: token1.type as 'color' | 'dimension' | 'number' | 'duration'
					}

					tokens.push(shadeToken)
				})
			} else {
				shades.forEach((shade, index) => {
					const shadeToken = tokens[index]

					if (shadeToken) {
						shadeToken.value[theme.id] = shade
					} else {
						addToast('Shade token not found',"error")
						throw new Error('Shade token not found')
					}
				})
			}
		} else {
			addToast('The token values are not the same type',"error")
			throw new Error('The token values are not the same type')
		}
	})

	return tokens.reverse()
}

const generateShades = <
	T extends 'color' | 'dimension' | 'number' | 'duration'
>(
	tokenValue1: TokenValueWithNoAlias<T>,
	tokenValue2: TokenValueWithNoAlias<T>,
	amountOfShades: number
): TokenValueWithNoAlias<'color' | 'dimension' | 'number' | 'duration'>[] => {
	const trueAmountOfShades = Number(amountOfShades) + 2 // We add 2 so start token and end token are included

	if (
		checkIfValueIsColorToken(tokenValue1) &&
		checkIfValueIsColorToken(tokenValue2)
	) {
		return generateColorShades(tokenValue1, tokenValue2, trueAmountOfShades)
	} else if (
		checkIfValueIsNumberToken(tokenValue1) &&
		checkIfValueIsNumberToken(tokenValue2)
	) {
		return generateNumberShades(tokenValue1, tokenValue2, trueAmountOfShades)
	} else if (
		checkIfValueIsDimensionToken(tokenValue1) &&
		checkIfValueIsDimensionToken(tokenValue2)
	) {
		return generateDimensionShades(tokenValue1, tokenValue2, trueAmountOfShades)
	} else {
		addToast('The token values are not the same type',"error")
		throw new Error('The token values are not the same type')
	}
}

const generateColorShades = (
	tokenValue1: ColorTokenValue,
	tokenValue2: ColorTokenValue,
	amountOfShades: number
): ColorTokenValue[] => {
	const shades: ColorTokenValue[] = []

	for (let i = 1; i < amountOfShades - 1; i++) {
		const newToken: TokenValue<'color'> = [
			tokenValue1[0] +
				(tokenValue2[0] - tokenValue1[0]) * (i / (amountOfShades - 1)),
			tokenValue1[1] +
				(tokenValue2[1] - tokenValue1[1]) * (i / (amountOfShades - 1)),
			tokenValue1[2] +
				(tokenValue2[2] - tokenValue1[2]) * (i / (amountOfShades - 1))
		]

		shades.push(newToken)
	}

	return shades
}

const generateNumberShades = (
	tokenValue1: NumberTokenValue,
	tokenValue2: NumberTokenValue,
	amountOfShades: number
): NumberTokenValue[] => {
	const shades: NumberTokenValue[] = []

	for (let i = 1; i < amountOfShades - 1; i++) {
		const newToken: TokenValue<'number'> = roundNumber(
			Number(tokenValue1) +
				(Number(tokenValue2) - Number(tokenValue1)) *
					(i / (amountOfShades - 1)),
			1
		)

		shades.push(newToken)
	}

	return shades
}

const generateDimensionShades = (
	tokenValue1: DimensionTokenValue,
	tokenValue2: DimensionTokenValue,
	amountOfShades: number
): DimensionTokenValue[] => {
	const shades: DimensionTokenValue[] = []

	for (let i = 1; i < amountOfShades - 1; i++) {
		const newToken: TokenValue<'dimension'> = {
			value: roundNumber(
				Number(tokenValue1.value) +
					(Number(tokenValue2.value) - Number(tokenValue1.value)) *
						(i / (amountOfShades - 1)),
				1
			),
			unit: tokenValue1.unit
		}

		shades.push(newToken)
	}

	return shades
}

const checkIfValuesAreValidForShade = (
	tokenValue1: TokenValue,
	tokenValue2: TokenValue
): boolean => {
	if (
		checkIfValueIsColorToken(tokenValue1) &&
		checkIfValueIsColorToken(tokenValue2)
	) {
		return true
	} else if (
		checkIfValueIsNumberToken(tokenValue1) &&
		checkIfValueIsNumberToken(tokenValue2)
	) {
		return true
	} else if (
		checkIfValueIsDimensionToken(tokenValue1) &&
		checkIfValueIsDimensionToken(tokenValue2)
	) {
		return true
	} else {
		return false
	}
}
