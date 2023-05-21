import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

const checkValidShade = (tokens: IToken[]): boolean => {
	return (
		tokens.length === 2 &&
		(checkValidColors(tokens) ||
			(checkValidDimension(tokens) && checkValidDimesionUnits(tokens)) ||
			checkValidNumber(tokens) ||
			checkValidDuration(tokens))
	)
}

const checkValidColors = (tokens: IToken[]): boolean => {
	return tokens.every((token) => token.type === 'color')
}

const checkValidDimension = (tokens: IToken[]): boolean => {
	return tokens.every((token) => token.type === 'dimension')
}

const checkValidDimesionUnits = (tokens: IToken[]): boolean => {
	return (
		(tokens[0] as IToken<'dimension'>).value.unit ===
		(tokens[1] as IToken<'dimension'>).value.unit
	)
}

const checkValidNumber = (tokens: IToken[]): boolean => {
	return tokens.every((token) => token.type === 'number')
}

const checkValidDuration = (tokens: IToken[]): boolean => {
	return tokens.every((token) => token.type === 'duration')
}

export default checkValidShade
