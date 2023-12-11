import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
import type {
	Group,
	GroupExpanded
} from '$lib/features/token-groups-store/types/group.interface'
import type { StyleDictionaryJson } from '../types/style-dictionary-json.type'
import { transformGroupsToExpandedGroups } from './groupTransforms/transfromGroupsToExpandedGroups'
import { transformGroupsToStyleDictionaryJson } from './groupTransforms/transfromGroupsToStyleDictionaryJson'

const transformDesignSystemToStyleDictionaryJsons = (
	groups: Group[],
	themes: Theme[],
	designSystemId: string
): {
	[key: string]: StyleDictionaryJson
} => {
	const expandedDesignSystem = transformGroupsToExpandedGroups(groups, themes)

	// Transform each GroupExtended[] to StyleDictionaryJsons
	const styleDictionaryJsons = themes.reduce((acc, theme) => {
		const styleDictionaryJson = transformGroupsToStyleDictionaryJson(
			expandedDesignSystem[theme.name] as GroupExpanded[],
			designSystemId
		)

		return {
			...acc,
			[theme.name]: styleDictionaryJson
		}
	}, {})

	return styleDictionaryJsons
}

export default transformDesignSystemToStyleDictionaryJsons
