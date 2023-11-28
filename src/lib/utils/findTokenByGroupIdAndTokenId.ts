import { addToast } from '$lib/features/toast/stores/toastStore'
import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
import type { Group } from '../features/token-groups-store/types/group.interface'
import { findGroupById } from './findGroupById'

export let findTokenByGroupIdAndTokenId = (
	groupId: string,
	tokenId: string,
	groups: Group[]
): IToken => {
	const group = findGroupById(groupId, groups)

	if (!group) {
		addToast(`Group with id "${groupId}" not found`,"error")
		throw new Error(`Group with id "${groupId}" not found`)
	}

	const token = group.tokens.find((token) => token.id === tokenId)

	if (!token) {
		addToast(`Token with id "${tokenId}" not found`,"error")
		throw new Error(`Token with id "${tokenId}" not found`)
	}

	return token
}
