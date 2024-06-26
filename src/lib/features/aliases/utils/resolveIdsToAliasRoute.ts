import groupsStore from '$lib/features/token-groups-store/groupsStore'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'
import { get } from 'svelte/store'

export const resolveIdsToAliasRoute = (
	groupId: string,
	tokenId?: string
): string | null => {
	const groups = get(groupsStore)
	const group = groups.find((group) => group.id === groupId)

	if (!group) {
		return null
	}

	let route = group.name

	if (group.parentGroup) {
		const parentRoute = resolveIdsToAliasRoute(group.parentGroup)
		if (parentRoute) {
			route = `${parentRoute}.${route}`
		}
	}

	if (tokenId) {
		const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups)
		if (token) {
			route = `{${route}.${token.name}}`
		} else {
			throw new Error(`Token with id ${tokenId} not found in group ${groupId}`)
		}
	}

	return route
}

export const resolveIdsToAliasRouteArray = (
	groupId: string,
	tokenId?: string
): string[] | null => {
	const groups = get(groupsStore)
	const group = groups.find((group) => group.id === groupId)

	if (!group) {
		return null
	}

	let route = [group.name]

	if (group.parentGroup) {
		const parentRoute = resolveIdsToAliasRouteArray(group.parentGroup)
		if (parentRoute) {
			route = [...parentRoute, ...route]
		}
	}

	if (tokenId) {
		const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups)
		if (token.name) {
			route = [...route, token.name]
		} else {
			throw new Error(`Token with id ${tokenId} not found in group ${groupId}`)
		}
	}

	return route
}

export const resolveIdsToAliasRouteAndIdsArray = (
	groupId: string,
	groups: Group[],
	tokenId?: string
):
	| {
			name: string
			id: string
	  }[]
	| null => {
	const group = groups.find((group) => group.id === groupId)

	if (!group) {
		return null
	}

	let route = [
		{
			name: group.name,
			id: group.id
		}
	]

	if (group.parentGroup) {
		const parentRoute = resolveIdsToAliasRouteAndIdsArray(
			group.parentGroup,
			groups
		)
		if (parentRoute) {
			route = [...parentRoute, ...route]
		}
	}

	if (tokenId) {
		const token = findTokenByGroupIdAndTokenId(groupId, tokenId, groups)
		if (token.name) {
			route = [
				...route,
				{
					name: token.name,
					id: token.id
				}
			]
		} else {
			throw new Error(`Token with id ${tokenId} not found in group ${groupId}`)
		}
	}

	return route
}
