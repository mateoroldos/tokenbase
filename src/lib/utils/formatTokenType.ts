import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'

function formatTokenType(tokenType: TokenType) {
	let formattedType = tokenType.replace(/([a-z])([A-Z])/g, '$1 $2')
	formattedType = formattedType.charAt(0).toUpperCase() + formattedType.slice(1)
	return formattedType
}

export default formatTokenType
