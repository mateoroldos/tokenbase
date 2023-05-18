import persistentWritable from '../../stores/custom/persistentWritable'
import { v4 as uuidv4 } from 'uuid'
import type { Group } from '$lib/features/token-groups-store/types/group-interface'
import type {
	IToken,
	TokenType,
	TokenValue
} from '$lib/features/token-groups-store/types/token-interface'
import { defaultTokenValues } from './defaultTokenValues'

export const createTokensGroupStore = () => {
	const { subscribe, update, set } = persistentWritable<Group[]>('designbase', [
		{
			id: 'root',
			name: 'Root',
			parentGroup: undefined,
			tokens: []
		}
	])

	const addGroup = (
		parentGroupId: string,
		name: string,
		description?: string
	): void => {
		update((designTokens) => {
			const parentGroup = designTokens.find(
				(group) => group.id === parentGroupId
			)

			if (!parentGroup) {
				console.error(`Parent group with ID ${parentGroupId} not found`)
				return designTokens
			}

			const newGroupId = uuidv4()

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
		update((designTokens) => {
			deepDeleteGroups(groupId, designTokens)

			return designTokens
		})
	}

	const addToken = <T extends TokenType>(
		groupId: string,
		type: T,
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

			// Add the new token to the group's tokens array
			group.tokens.push({
				id: uuidv4(),
				type,
				value: value ?? defaultTokenValues[type],
				name: name ?? undefined
			})

			return designTokens
		})
	}

	const bulkAddTokens = <T extends TokenType>(
		groupId: string,
		tokens: {
			type: T
			value: TokenValue<T>
			name?: string
			description?: string
		}[],
		index?: number
	) => {
		update((designTokens) => {
			// Find the group to add the token to
			const group = designTokens.find((group) => group.id === groupId)

			if (!group) {
				console.error(`Group with ID ${groupId} not found`)
				return designTokens
			}

			const i = index || group.tokens.length

			// Add the new token to the group's tokens array
			tokens.forEach((token) => {
				group.tokens.splice(i, 0, {
					id: uuidv4(),
					name: token.name || '',
					description: token.description || '',
					value: token.value,
					type: token.type
				})
			})

			return designTokens
		})
	}

	const deleteToken = (tokenId: string): void => {
		update((designTokens) => {
			// Find the group that contains the token
			const group = designTokens.find((group) =>
				group.tokens.find((token) => token.id === tokenId)
			)

			if (!group) {
				console.error(`Token with ID ${tokenId} not found`)
				return designTokens
			}

			// Delete the token from the group's tokens array
			deleteTokenById(tokenId, group.tokens)

			return designTokens
		})
	}

	return {
		subscribe,
		set,
		addGroup,
		deleteGroup,
		addToken,
		bulkAddTokens,
		deleteToken
	}
}

const designTokensGroupStore = createTokensGroupStore()

export default designTokensGroupStore

const deepDeleteGroups = (id: string, groups: Group[]): void => {
	// delete parent group
	deleteGroupById(id, groups)

	// delete children groups
	const childrenGroups = groups.filter((group) => group.parentGroup === id)
	childrenGroups.forEach((group) => {
		deepDeleteGroups(group.id, groups)
	})
}

const deleteGroupById = (id: string, groups: Group[]): void => {
	const index = groups.findIndex((group) => group.id === id)
	if (index !== -1) {
		groups.splice(index, 1)
	}
}

const deleteTokenById = (id: string, tokens: IToken[]): void => {
	const index = tokens.findIndex((token) => token.id === id)
	if (index !== -1) {
		tokens.splice(index, 1)
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
