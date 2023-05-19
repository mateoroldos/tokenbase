import type { Group } from '../token-groups-store/types/group-interface'
import createTree from '../token-groups-tree/functions/createTree'
import type {
	IToken,
	TokenType,
	TokenValue
} from '../token-groups-store/types/token-interface'

const convertTokensToJson = (groups: Group[]): string => {
	const jsonTokens: { [groupName: string]: any[] } = {}

	groups.forEach((group) => {
		const groupName = group.name
		jsonTokens[groupName] = group.tokens.map((token) => {
			const { id, name, description, value, type } = token
			return {
				id,
				name,
				description,
				value: convertValueToJson(value, type),
				type
			}
		})
	})

	return JSON.stringify(jsonTokens, null, 2)
}

const getAllTokens = (groups: Group[]): IToken[] => {
	const tokens: IToken[] = []
	groups.forEach((group) => {
		tokens.push(...group.tokens)
	})
	return tokens
}

const convertValueToJson = <T extends TokenType>(
	value: TokenValue<T>,
	type: T
): unknown => {
	if (type === 'color') {
		const [r, g, b] = value as [number, number, number]
		return { r, g, b }
	} else if (type === 'dimension') {
		const { value: val, unit } = value as {
			value: number
			unit: 'px' | 'rem'
		}
		return { value: val, unit }
	} else if (type === 'fontFamily') {
		return value as string[]
	} else if (type === 'fontWeight') {
		return value as string | number
	} else if (type === 'duration') {
		return value as number
	} else if (type === 'cubicBezier') {
		const [x1, y1, x2, y2] = value as [number, number, number, number]
		return { x1, y1, x2, y2 }
	} else if (type === 'number') {
		return value as number
	}
	return null
}

export default convertTokensToJson

// import type { Group } from '../token-groups-store/types/group-interface'
// import type {
// 	IToken,
// 	TokenType,
// 	TokenValue
// } from '../token-groups-store/types/token-interface'

// const convertTokensToJson = (groups: Group[]): string => {
// 	const tokens = getAllTokens(groups)

// 	const jsonTokens = tokens.map((token) => {
// 		const { id, name, description, value, type } = token
// 		return {
// 			id,
// 			name,
// 			description,
// 			value: convertValueToJson(value, type),
// 			type
// 		}
// 	})

// 	return JSON.stringify(jsonTokens, null, 2)
// }

// const getAllTokens = (groups: Group[]): IToken[] => {
// 	const tokens: IToken[] = []
// 	groups.forEach((group) => {
// 		tokens.push(...group.tokens)
// 	})
// 	return tokens
// }

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

// export default convertTokensToJson
