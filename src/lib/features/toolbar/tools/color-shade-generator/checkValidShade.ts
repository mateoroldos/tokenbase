import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

const checkValidShade = (
	tokens: IToken[],
	selectedTokensIds: string[]
): boolean => {
	if (selectedTokensIds.length === 2) {
		let firstToken = tokens.find(
			(token) => token.id === selectedTokensIds[0]
		) as IToken
		let secondToken = tokens.find(
			(token) => token.id === selectedTokensIds[1]
		) as IToken

		if (firstToken && secondToken) {
			let selectedTokens = [firstToken, secondToken]

			return (
				checkValidColors(selectedTokens) ||
				(checkValidDimension(selectedTokens) &&
					checkValidDimesionUnits(selectedTokens)) ||
				checkValidNumber(selectedTokens) ||
				checkValidDuration(selectedTokens)
			)
		}
	}

	return false
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
