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
	const rootGroup = groups.find((group) => group.id === designSystemId)

	if (!rootGroup) {
		throw new Error('Group not found')
	}

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
): {
	[key: string]: StyleDictonaryToken
} => {
	const dictonary: { [key: string]: StyleDictonaryToken } = {}

	tokens.forEach((token) => {
		const { name, value, type } = token

		const dictonaryToken: StyleDictonaryToken = {
			value: convertValueToJson(value, type),
			comment: token.description,
			type: type
		}

		dictonary[name ?? 'undefined'] = dictonaryToken
	})

	return dictonary
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
