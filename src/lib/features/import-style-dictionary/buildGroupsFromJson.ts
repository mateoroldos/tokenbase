import type { ExportNumberTokenValue } from './../token-management/number/export-number-value.type'
import type { IToken } from '../token-groups-store/types/token-interface'
import type { Group } from '../token-groups-store/types/group-interface'
import type { TokenType } from '../token-groups-store/types/token-interface'
import type { TokenValue } from '../token-groups-store/types/token-interface'
import type { ExportDimensionTokenValue } from '../token-management/dimension/export-dimension-value.type'
import type { ExportColorTokenValue } from '../token-management/color/export-color-value.type'
import { v4 as uuidv4 } from 'uuid'
import transformToImportColorValue from '../token-management/color/transformToImportColorValue'
import transformToImportDimensionValue from '../token-management/dimension/transformToImporDimensionValue'
import type { ExportCubicBezierTokenValue } from '../token-management/cubic-bezier/export-cubic-bezier-value.type'
import type { ColorTokenValue } from '../token-management/color/internal-color-value.type'
import type { DimensionTokenValue } from '../token-management/dimension/internal-dimension-value.type'
import type { FontFamilyTokenValue } from '../token-management/font-family/internal-font-family-value.type'
import type { FontWeightTokenValue } from '../token-management/font-weight/internal-font-weight-value.type'
import type { CubicBezierTokenValue } from '../token-management/cubic-bezier/internal-cubic-bezier-value.type'
import transformToExportDimensionValue from '../token-management/dimension/transformToExportDimensionValue'

interface StyleDictionaryToken {
	value: TokenValue<TokenType>
	comment?: string
	type: TokenType
}

interface StyleDictionaryGroup {
	[key: string]: StyleDictionaryToken | StyleDictionaryGroup
}

const buildStyleDictionaryNode = (
	styleDictionaryGroup: StyleDictionaryGroup,
	parentId: string,
	name?: string
): Group[] => {
	const tokens: IToken[] = [] // aca guardamos los tokens de este grupo
	const groupId = uuidv4() // nueva id para el grupo en el q estamos trabajndo
	const groups: Group[] = [] // array donde vamos a ir guardando todos los grupos

	Object.entries(styleDictionaryGroup).forEach(([key, data]) => {
		if (data.type && data.value) {
			if (
				data.value.toString().startsWith('{') &&
				data.value.toString().endsWith('}')
			) {
				// Check if the value is an alias
				const aliasValue = data.value.toString().slice(2, -1) // Remove the curly braces
				const [groupPath, aliasTokenName] = aliasValue.split('.') // Split the group path and alias token name
				const groupPathSegments = groupPath?.split('.') // Split the group path into segments
				const tokenAliased = tokens.find((t) => t.name == aliasTokenName)

				if (tokenAliased) {
					// Replace the alias value with the real value
					data.value = tokenAliased.value
					if (data.type === 'dimension') {
						data.value = transformToExportDimensionValue(
							data.value as DimensionTokenValue
						)
					}
				}
			}

			// caso que estemos recorriendo un token
			const tokenData = data as StyleDictionaryToken
			const { value, comment, type } = tokenData

			let valueTransformed

			if (type === 'color') {
				const colorValue = value as ExportColorTokenValue
				valueTransformed = transformToImportColorValue(
					colorValue
				) as ColorTokenValue
			} else if (type === 'dimension') {
				const dimensionValue = value as ExportDimensionTokenValue
				valueTransformed = transformToImportDimensionValue(
					dimensionValue
				) as DimensionTokenValue
			} else if (type === 'fontFamily') {
				valueTransformed = value as FontFamilyTokenValue
			} else if (type === 'fontWeight') {
				valueTransformed = value as FontWeightTokenValue
			} else if (type === 'cubicBezier') {
				const [x1, y1, x2, y2] = value as ExportCubicBezierTokenValue
				valueTransformed = [x1, y1, x2, y2] as CubicBezierTokenValue
			} else if (type === 'number') {
				valueTransformed = value as ExportNumberTokenValue
			} else {
				valueTransformed = value
			}

			const token: IToken = {
				id: uuidv4(),
				name: key,
				value: valueTransformed,
				description: comment,
				type
			}

			tokens.push(token)
		} else {
			// caso que estemos recorriendo un grupo
			let subGroups

			if (name) {
				// caso que estemos en un grupo que no es el root
				subGroups = buildStyleDictionaryNode(
					data as StyleDictionaryGroup,
					groupId,
					key
				)
			} else {
				// caso que estemos en el root
				subGroups = buildStyleDictionaryNode(
					data as StyleDictionaryGroup,
					parentId,
					key
				)
			}

			groups.push(...subGroups)
		}
	})

	// push actual group
	if (name) {
		const newGroup: Group = {
			id: groupId,
			name: name,
			parentGroup: parentId,
			tokens
		}

		groups.push(newGroup)
	}
	console.log(groups)

	return groups
}

const styleDictionaryToGroups = (json: string, parentId: string): Group[] => {
	const styleDictionaryGroup: StyleDictionaryGroup = JSON.parse(json)

	return buildStyleDictionaryNode(styleDictionaryGroup, parentId)
}

export default styleDictionaryToGroups
