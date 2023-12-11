import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'

const detachTokenValueInstance = (value: TokenValue): TokenValue => {
	return JSON.parse(JSON.stringify(value))
}

export default detachTokenValueInstance
