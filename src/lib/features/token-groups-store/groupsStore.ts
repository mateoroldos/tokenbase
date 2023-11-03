import persistentWritable from '../../stores/custom/persistentWritable'
import { v4 as uuidv4 } from 'uuid'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type {
	IToken,
	TokenType,
	TokenValue
} from '$lib/features/token-groups-store/types/token.interface'
import { getDefaultTokenValues } from './defaultTokenValues'
import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

export const createGroupsStore = () => {
	const { subscribe, update, set } = persistentWritable<Group[]>(
		'tokenbase-groups',
		[]
	)

	const addGroup = (
		name: string,
		id?: string,
		parentGroupId?: string,
		description?: string
	): void => {
		update((designTokens) => {
			const newGroupId = id ?? uuidv4()

			designTokens.push({
				id: newGroupId,
				name,
				description,
				parentGroup: parentGroupId,
				tokens: []
			})

			return designTokens
		})
	}

	const deleteGroup = (groupId: string): void => {
		update((groups) => {
			deepDeleteGroups(groupId, groups)

			return groups
		})
	}

	const addToken = <T extends TokenType>(
		groupId: string,
		type: T,
		themes: Theme[],
		value?: TokenValue<T>,
		name?: string
	): void => {
		update((designTokens) => {
			// Find the group to add the token to
			const group = designTokens.find((group) => group.id === groupId)

			if (!group) {
				console.error(`Group with ID ${groupId} not found`)
				return designTokens
			}

			const resolvedValue =
				value ?? (getDefaultTokenValues(type) as TokenValue<T>)

			const tokenValues: {
				[themeId: string]: TokenValue<T>
			} = {}

			themes.forEach((theme) => {
				tokenValues[theme.id] = resolvedValue
			})

			// Add the new token to the group's tokens array
			group.tokens.push({
				id: uuidv4(),
				type,
				value: tokenValues,
				name: name ?? undefined
			})

			return designTokens
		})
	}

	const bulkAddTokens = <T extends TokenType>(
		groupId: string,
		themes: Theme[],
		tokens: {
			type: T
			value: TokenValue<T>
			name?: string
			description?: string
		}[],
		index?: number
	) => {
		update((groups) => {
			// Find the group to add the token to
			const group = groups.find((group) => group.id === groupId)

			if (!group) {
				console.error(`Group with ID ${groupId} not found`)
				return groups
			}

			const i = index || group.tokens.length

			// Add the new token to the group's tokens array
			tokens.forEach((token) => {
				const tokenValues: {
					[themeId: string]: TokenValue<T>
				} = {}

				themes.forEach((theme) => {
					tokenValues[theme.id] = token.value
				})

				group.tokens.splice(i, 0, {
					id: uuidv4(),
					name: token.name || '',
					description: token.description || '',
					value: tokenValues,
					type: token.type
				})
			})

			return groups
		})
	}

	const deleteToken = (tokenId: string): void => {
		update((groups) => {
			// Find the group that contains the token
			const group = groups.find((group) =>
				group.tokens.find((token) => token.id === tokenId)
			)

			if (!group) {
				console.error(`Token with ID ${tokenId} not found`)
				return groups
			}

			// Delete the token from the group's tokens array
			deleteTokenById(tokenId, group.tokens)

			return groups
		})
	}

	const addTheme = (groupId: string, themeId: string) => {
		update((groups) => {
			deepAddTheme(groupId, groups, themeId)

			return groups
		})
	}

	return {
		subscribe,
		set,
		addGroup,
		deleteGroup,
		addToken,
		bulkAddTokens,
		deleteToken,
		addTheme
	}
}

const groupsStore = createGroupsStore()

export default groupsStore

const deepDeleteGroups = (id: string, groups: Group[]): void => {
	// delete parent group
	deleteGroupById(id, groups)

	// delete children groups
	const childrenGroups = groups.filter((group) => group.parentGroup === id)
	childrenGroups.forEach((group) => {
		deepDeleteGroups(group.id, groups)
	})
}

const deleteTokenById = (id: string, tokens: IToken[]): void => {
	const index = tokens.findIndex((token) => token.id === id)
	if (index !== -1) {
		tokens.splice(index, 1)
	}
}

const addTheme = (themeId: string, tokens: IToken[]) => {
	tokens.forEach((token) => {
		token.value[themeId] = getDefaultTokenValues(token.type)
	})
}

const deepAddTheme = (parentId: string, groups: Group[], themeId: string) => {
	// Add values to current group
	if (groups.find((group) => group.parentGroup === parentId) !== undefined) {
		const childGroups = groups.filter((group) => group.parentGroup === parentId)

		childGroups.forEach((group) => {
			addTheme(themeId, group.tokens)
		})
	}

	const childrenGroups = groups.filter(
		(group) => group.parentGroup === parentId
	)

	childrenGroups.forEach((group) => {
		deepAddTheme(group.id, groups, themeId)
	})
}

const deleteGroupById = (id: string, groups: Group[]): void => {
	const index = groups.findIndex((group) => group.id === id)
	if (index !== -1) {
		groups.splice(index, 1)
	}
}

// Helpers
export const moveToken = (
	fromIndex: number,
	toIndex: number,
	tokens: IToken[]
) => {
	const token = tokens[fromIndex] as IToken

	if (fromIndex > toIndex) {
		tokens.splice(fromIndex, 1)
		tokens.splice(toIndex, 0, token)
	} else {
		tokens.splice(toIndex, 0, token)
		tokens.splice(fromIndex, 1)
	}

	return tokens
}
