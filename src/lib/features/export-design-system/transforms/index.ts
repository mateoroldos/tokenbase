import type {
	Group,
	GroupExpanded
} from '$lib/features/token-groups-store/types/group.interface'
import type { StyleDictionaryJson } from '../types/style-dictionary-json.type'
import { transformGroupsToExpandedGroups } from './groupTransforms/transfromGroupsToExpandedGroups'
import { transformGroupsToStyleDictionaryJson } from './groupTransforms/transfromGroupsToStyleDictionaryJson'

const transformDesignSystemToStyleDictionaryJsons = (
	groups: Group[],
	themes: string[],
	designSystemId: string
): {
	[key: (typeof themes)[number]]: StyleDictionaryJson
} => {
	const expandedDesignSystem = transformGroupsToExpandedGroups(groups, themes)

	console.log('Expanded groups', groups)
	console.log(themes)

	// Transform each GroupExtended[] to StyleDictionaryJsons
	const styleDictionaryJsons = themes.reduce((acc, theme) => {
		const styleDictionaryJson = transformGroupsToStyleDictionaryJson(
			expandedDesignSystem[theme] as GroupExpanded[],
			designSystemId
		)

		return {
			...acc,
			[theme]: styleDictionaryJson
		}
	}, {})

	console.log(styleDictionaryJsons)

	return styleDictionaryJsons
}

export default transformDesignSystemToStyleDictionaryJsons
