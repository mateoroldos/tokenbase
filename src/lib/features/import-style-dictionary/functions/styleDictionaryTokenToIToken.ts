import type { ExportCubicBezierTokenValue } from '$lib/features/token-management/cubic-bezier/export-cubic-bezier-value.type'
import type { CubicBezierTokenValue } from '$lib/features/token-management/cubic-bezier/internal-cubic-bezier-value.type'
import type { FontFamilyTokenValue } from '$lib/features/token-management/font-family/internal-font-family-value.type'
import type { FontWeightTokenValue } from '$lib/features/token-management/font-weight/internal-font-weight-value.type'
import type { ExportNumberTokenValue } from '$lib/features/token-management/number/export-number-value.type'
import type {
	IToken,
	TokenValue
} from '../../token-groups-store/types/token.interface'
import transformToImportColorValue from '../../token-management/color/transformToImportColorValue'
import transformToImportDimensionValue from '../../token-management/dimension/transformToImportDimensionValue'
import type { StyleDictionaryToken } from '../types/style-dictionary-token.interface'
import { v4 as uuidv4 } from 'uuid'
import type { Theme } from '../../token-groups-store/types/design-system-overview.interface'

const styleDictionaryTokenToIToken = (
	styleDictionaryToken: StyleDictionaryToken,
	name: string,
	themes: Theme[]
): IToken => {
	const { type, value, comment } = styleDictionaryToken

	const isAlias =
		value.toString().startsWith('{') && value.toString().endsWith('}')

	const resolvedValues: {
		[key in string]: TokenValue
	} = {}

	themes.map((theme) => {
		resolvedValues[theme.id] = isAlias
			? value
			: transformTokenValue(value, type)
	})

	const token: IToken = {
		id: uuidv4(),
		name,
		value: resolvedValues,
		description: comment,
		type
	}

	return token
}

const transformTokenValue = (value: any, type: string) => {
	let valueTransformed

	if (type === 'dimension') {
		valueTransformed = transformToImportDimensionValue(value)
	} else if (type === 'color') {
		valueTransformed = transformToImportColorValue(value)
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

	return valueTransformed
}

export default styleDictionaryTokenToIToken
