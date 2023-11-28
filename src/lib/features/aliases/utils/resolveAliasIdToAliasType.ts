import { addToast } from '$lib/features/toast/stores/toastStore'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type {
	IToken,
	TokenType
} from '$lib/features/token-groups-store/types/token.interface'
import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'

export let resolveAliasIdToAliasType = (
	tokenId: string,
	groupId: string,
	groups: Group[]
): TokenType => {
	const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups) as IToken

	if (!token) {
		addToast(`Token with id "${tokenId}" not found`, "error")
		throw new Error(`Token with id "${tokenId}" not found`)
	}

	return token.type
}
