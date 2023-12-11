import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
import type {
	GroupExpanded,
	Group
} from '$lib/features/token-groups-store/types/group.interface'
import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'

export const transformGroupsToExpandedGroups = (
	groups: Group[],
	themes: Theme[]
): {
	[key: string]: GroupExpanded[]
} => {
	const expandedGroups = themes.reduce((acc, theme) => {
		acc[theme.name] = groups.map((group) => {
			return {
				...group,
				tokens: group.tokens.map((token) => {
					return {
						...token,
						value: token.value[theme.id] as TokenValue
					}
				})
			}
		})
		return acc
	}, {} as { [key: string]: GroupExpanded[] })

	return expandedGroups
}
