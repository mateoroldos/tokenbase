import type { Group } from '../token-groups-store/types/group-interface'
import createTree from '../token-groups-tree/functions/createTree'
import type {
	IToken,
	TokenType,
	TokenValue
} from '../token-groups-store/types/token-interface'

const convertTokensToJson = (groups: Group[]): string => {
	const jsonTokens: { [groupName: string]: { [tokenId: string]: any } } = {}

	groups.forEach((group) => {
		const groupName = group.name
		//si el parent existe, lo agrego como nested
		if (group.parentGroup) {
			// If the parent group exists in jsonTokens, add the current group as a nested object
			if (jsonTokens[group.parentGroup]) {
				jsonTokens[group.parentGroup][groupName] = {}
			} else {
				// If the parent group doesn't exist in jsonTokens, create it as an empty object
				jsonTokens[group.parentGroup] = { [groupName]: {} }
			}
		}
		group.tokens.forEach((token) => {
			const { name, description, value, type } = token
			const tokenObject = {
				name,
				description,
				value: convertValueToJson(value, type),
				type
			}

			// Determine the target object based on the presence of the parentId
			const targetObject = group.parentGroup
				? jsonTokens[group.parentGroup][groupName]
				: jsonTokens[groupName]
			targetObject[name] = tokenObject
		})
	})

	return JSON.stringify(jsonTokens, null, 2)
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
// import createTree from '../token-groups-tree/functions/createTree'
// import type {
// 	IToken,
// 	TokenType,
// 	TokenValue
// } from '../token-groups-store/types/token-interface'

// const convertTokensToJson = (groups: Group[]): string => {
// 	const tokensByGroup: { [groupName: string]: IToken[] } = {}

// 	groups.forEach((group) => {
// 		const groupName = getUniqueGroupName(group.name, tokensByGroup)
// 		tokensByGroup[groupName] = group.tokens.map((token) => {
// 			const uniqueName = getUniqueTokenName(
// 				token.name,
// 				tokensByGroup[groupName]
// 			)
// 			return { ...token, name: uniqueName }
// 		})
// 	})

// 	const jsonTokens: { [groupName: string]: { [tokenId: string]: any } } = {}

// 	for (const groupName in tokensByGroup) {
// 		if (tokensByGroup.hasOwnProperty(groupName)) {
// 			const tokens = tokensByGroup[groupName]
// 			jsonTokens[groupName] = {}

// 			tokens.forEach((token) => {
// 				const { name, description, value, type } = token
// 				const tokenObject = {
// 					name,
// 					description,
// 					value: convertValueToJson(value, type),
// 					type
// 				}

// 				jsonTokens[groupName][name] = tokenObject
// 			})
// 		}
// 	}

// 	return JSON.stringify(jsonTokens, null, 2)
// }

// const getUniqueGroupName = (
// 	groupName: string,
// 	jsonTokens: { [key: string]: any[] }
// ): string => {
// 	let uniqueGroupName = groupName
// 	let suffix = 1

// 	while (jsonTokens.hasOwnProperty(uniqueGroupName)) {
// 		uniqueGroupName = `${groupName}_${suffix}`
// 		suffix++
// 	}

// 	return uniqueGroupName
// }

// const getUniqueTokenName = (
// 	name: string | undefined,
// 	tokens: IToken[] | undefined
// ): string => {
// 	let uniqueName = name || ''
// 	let counter = 1

// 	while (tokens?.find((token) => token.name === uniqueName)) {
// 		uniqueName = `${name || 'token'}-${counter}`
// 		counter++
// 	}

// 	return uniqueName
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
