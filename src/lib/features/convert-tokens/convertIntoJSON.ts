import type { Group } from '../token-groups-store/types/group-interface'
import type { IToken } from '../token-groups-store/types/token-interface'

interface StyleDictonaryToken {
	value: string
	comment?: string
	theamable?: boolean
	name?: string
	attirbutes?: {
		[key: string]: string
	}
}

interface StyleDictonaryGroup {
	[key: string]: StyleDictonaryToken | StyleDictonaryGroup
}

const buildStyleDictionaryTree = (groups: Group[]): StyleDictonaryGroup => {
	const rootGroup = groups.find((group) => group.id === 'root')

	if (!rootGroup) {
		throw new Error('Root group not found')
	}

	const subtree = buildStyleDictionarySubTree(groups, 'root')
	const root: StyleDictonaryGroup = {
		...subtree
	}

	return root
}

const buildStyleDictionarySubTree = (
	groups: Group[],
	parentId: string
): StyleDictonaryGroup => {
	let nodes: StyleDictonaryGroup = {}

	groups.forEach((group) => {
		if (group.parentGroup === parentId) {
			const subtree = buildStyleDictionarySubTree(groups, group.id)
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

const convertTokensToStyleDictonaryTokens = (
	tokens: IToken[]
): {
	[key: string]: StyleDictonaryToken
} => {
	const dictonary: { [key: string]: StyleDictonaryToken } = {}

	tokens.forEach((token) => {
		const { name, value, type } = token

		const dictonaryToken: StyleDictonaryToken = {
			value: 'a',
			comment: token.description,
			theamable: true,
			name: name
		}

		dictonary[name ?? 'a'] = dictonaryToken
	})

	return dictonary
}

const buildStyleDictonaryJson = (groups: Group[]): string => {
	const tree = buildStyleDictionaryTree(groups)

	const json = JSON.stringify(tree, null, 2)

	return json
}

export default buildStyleDictonaryJson

// const convertValueToJson = <T extends TokenType>(
// 	value: TokenValue<T>,
// 	type: T
// ): unknown => {
// 	if (type === 'color') {
// 		const [r, g, b] = value as [number, number, number]
// 		return { r, g, b }
// 	} else if (type === 'dimension') {
// 		const { value: val, unit } = value as {
// 			value: number
// 			unit: 'px' | 'rem'
// 		}
// 		return { value: val, unit }
// 	} else if (type === 'fontFamily') {
// 		return value as string[]
// 	} else if (type === 'fontWeight') {
// 		return value as string | number
// 	} else if (type === 'duration') {
// 		return value as number
// 	} else if (type === 'cubicBezier') {
// 		const [x1, y1, x2, y2] = value as [number, number, number, number]
// 		return { x1, y1, x2, y2 }
// 	} else if (type === 'number') {
// 		return value as number
// 	}
// 	return null
// }

// hsl
// hct
