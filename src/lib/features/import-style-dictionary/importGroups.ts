import { get } from 'svelte/store'
import groupsStore from '../token-groups-store/groupsStore'
import type { Theme } from '../token-groups-store/types/design-system-overview.interface'
import type { Group } from '../token-groups-store/types/group.interface'
import TEMPLATE_DEFAULT_THEME from '../templates/constants/TEMPLATE_DEFAULT_THEME'
import type { IToken } from '../token-groups-store/types/token.interface'
import detachTokenValueInstance from '$lib/utils/detachTokenValueInstance'

export const importGroups = (
	groupsToImport: Group[],
	templateId: string,
	parentGroupId: string,
	themes: Theme[],
	isDesignSystemRoot: boolean
) => {
	const parentGroup = get(groupsStore).find(
		(group) => group.id === parentGroupId
	)

	if (!parentGroup && !isDesignSystemRoot) {
		return
	}

	const groupsWithUpdatedTokenValues = updateGroupsTokenValuesWithThemes(
		groupsToImport,
		themes
	)

	groupsStore.bulkAddGroups(
		groupsWithUpdatedTokenValues,
		parentGroupId,
		templateId
	)
}

export const importTokens = (
	groupToImport: Group,
	parentGroupId: string,
	themes: Theme[],
	isDesignSystemRoot: boolean
) => {
	const parentGroup = get(groupsStore).find(
		(group) => group.id === parentGroupId
	)

	if (!parentGroup && !isDesignSystemRoot) {
		return
	}

	const tokensWithUpdatedValueThemes = updateTokenValuesWithThemes(
		groupToImport.tokens,
		themes
	)

	if (isDesignSystemRoot) {
		groupsStore.addGroup(
			groupToImport.name,
			parentGroupId,
			undefined,
			tokensWithUpdatedValueThemes
		)
	} else {
		groupsStore.bulkAddTokens(parentGroupId, tokensWithUpdatedValueThemes)
	}
}

const updateGroupsTokenValuesWithThemes = (
	groups: Group[],
	themes: Theme[]
) => {
	const groupsWithThemes = groups.map((group) => {
		group.tokens = updateTokenValuesWithThemes(group.tokens, themes)

		return group
	})

	return groupsWithThemes
}

const updateTokenValuesWithThemes = (tokens: IToken[], themes: Theme[]) => {
	const tokensWithThemes = tokens.map((token) => {
		const tokenValue = token.value[TEMPLATE_DEFAULT_THEME.id]

		if (tokenValue) {
			themes.forEach((theme) => {
				token.value[theme.id] = detachTokenValueInstance(tokenValue)
			})
		}

		delete token.value[TEMPLATE_DEFAULT_THEME.id]

		return token
	})

	return tokensWithThemes
}
