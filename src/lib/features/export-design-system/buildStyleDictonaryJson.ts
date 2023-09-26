import type { DurationTokenValue } from './../token-management/duration/internal-duration.value.type'
import type { Group } from '../token-groups-store/types/group-interface'
import type { IToken } from '../token-groups-store/types/token-interface'
import type {
	TokenType,
	TokenValue
} from '../token-groups-store/types/token-interface'
import type { ColorTokenValue } from '../token-management/color/internal-color-value.type'
import transformToExportColorValue from '../token-management/color/transformToExportColorValue'
import transformToExportDurationValue from '../token-management/duration/transformToExportDurationValue'
import type { DimensionTokenValue } from '../token-management/dimension/internal-dimension-value.type'
import transformToExportDimensionValue from '../token-management/dimension/transformToExportDimensionValue'
import { get } from 'svelte/store'
import groupsStore from '../token-groups-store/groups'

interface StyleDictonaryToken {
	value: ReturnType<typeof convertValueToJson>
	type: TokenType
	comment?: string
	name?: string
}

interface StyleDictonaryGroup {
	[key: string]: StyleDictonaryToken | StyleDictonaryGroup
}

const groupsToStyleDictionaryTree = (
	groups: Group[],
	designSystemId: string
): StyleDictonaryGroup => {
	const subtree = buildStyleDictionaryNode(groups, designSystemId)

	const root: StyleDictonaryGroup = {
		...subtree
	}

	return root
}

const buildStyleDictionaryNode = (
	groups: Group[],
	parentId: string
): StyleDictonaryGroup => {
	let nodes: StyleDictonaryGroup = {}

	groups.forEach((group) => {
		if (group.parentGroup === parentId) {
			const subtree = buildStyleDictionaryNode(groups, group.id)
			const tokens = convertTokensToStyleDictonaryTokens(group.tokens)

			const node: StyleDictonaryGroup = {
				[group.name]: {
					...tokens,
					...subtree
				}
			}

			nodes = {
				...nodes,
				...node
			}
		}
	})

	return nodes
}

const buildStyleDictonaryJson = (
	groups: Group[],
	designSystemId: string
): string => {
	const tree = groupsToStyleDictionaryTree(groups, designSystemId)

	const json = JSON.stringify(tree, null, 2)

	return json
}

export default buildStyleDictonaryJson

const convertTokensToStyleDictonaryTokens = (
	tokens: IToken[]
): { [key: string]: StyleDictonaryToken } => {
	const dictionary: { [key: string]: StyleDictonaryToken } = {}

	const getTokenRoute = (groupId: string, aliasId?: string): string => {
		const group = get(groupsStore).find((group) => group.id === groupId)

		let tokenName = undefined

		if (aliasId != undefined) {
			const token = group?.tokens.find((t) => t.id === aliasId)

			if (!token) return ''

			tokenName = token.name
		}

		const groupName = group?.name
		const parentRoute = group?.parentGroup
			? getTokenRoute(group.parentGroup)
			: ''

		if (aliasId != undefined) {
			return (parentRoute + '.' + groupName + '.' + tokenName).replace(
				'.undefined.',
				''
			)
		} else {
			return parentRoute + '.' + groupName
		}
	}

	tokens.forEach((token) => {
		const { name, value, type, alias } = token

		const dictionaryToken: StyleDictonaryToken = {
			value: alias
				? `{${getTokenRoute(alias.groupId, alias.tokenId)}}`
				: convertValueToJson(value, type),
			comment: token.description,
			type: type
		}

		dictionary[name ?? 'undefined'] = dictionaryToken
	})

	console.log(dictionary)

	return dictionary
}

const convertValueToJson = <T extends TokenType>(
	value: TokenValue<T>,
	type: T
) => {
	if (type === 'color') {
		const colorValue = value as ColorTokenValue
		return transformToExportColorValue(colorValue)
	} else if (type === 'dimension') {
		const dimensionValue = value as DimensionTokenValue
		return transformToExportDimensionValue(dimensionValue)
	} else if (type === 'fontFamily') {
		return value as string[]
	} else if (type === 'fontWeight') {
		return value as string | number
	} else if (type === 'duration') {
		const durationValue = value as DurationTokenValue
		return transformToExportDurationValue(durationValue)
	} else if (type === 'cubicBezier') {
		const [x1, y1, x2, y2] = value as [number, number, number, number]
		return { x1, y1, x2, y2 }
	} else if (type === 'number') {
		return value as number
	}
	return null
}
