import type { IToken } from './../token-groups-store/types/token-interface'
import type { Group } from '../token-groups-store/types/group-interface'
import type { TokenType } from '../token-groups-store/types/token-interface'
import type { TokenValue } from '../token-groups-store/types/token-interface'
import { v4 as uuidv4 } from 'uuid'

interface StyleDictionaryToken {
	value: TokenValue<TokenType>
	comment?: string
	type: TokenType
}

interface StyleDictionaryGroup {
	[key: string]: StyleDictionaryToken | StyleDictionaryGroup
}

const readAndConvertElement = (
	styleDictionaryGroup: StyleDictionaryGroup,
	parentId: string,
	groupName: string
): Group[] => {
	const tokens: IToken[] = [] // aca guardamos los tokens de este grupo
	const groupId = groupName === 'root' ? 'root' : uuidv4() // nueva id para el grupo en el q estamos trabajndo

	const groups: Group[] = [] // array donde vamos a ir guardando todos los grupos

	Object.entries(styleDictionaryGroup).forEach(([key, data]) => {
		if (data.type && data.value) {
			// caso que estemos recorriendo un token
			const tokenData = data as StyleDictionaryToken
			const { value, comment, type } = tokenData

			const token: IToken = {
				id: uuidv4(),
				name: key,
				value,
				description: comment,
				type
			}

			tokens.push(token)
		} else {
			// caso que estemos recorriendo un grupo
			const subGroups = readAndConvertElement(
				data as StyleDictionaryGroup,
				groupId,
				key
			)

			groups.push(...subGroups)
		}
	})

	const newGroup: Group = {
		id: groupId,
		name: groupName,
		parentGroup: parentId,
		tokens
	}

	groups.push(newGroup)

	return groups
}

const convertJsonToGroupArray = (
	json: string,
	groupName: string,
	parentId: string
): Group[] => {
	const styleDictionaryGroup: StyleDictionaryGroup = JSON.parse(json)
	return readAndConvertElement(styleDictionaryGroup, parentId, groupName)
}

export default convertJsonToGroupArray
