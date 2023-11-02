import type {
	GroupExpanded,
	Group
} from '$lib/features/token-groups-store/types/group.interface'
import type { TokenValue } from '$lib/features/token-groups-store/types/token.interface'

export const transformGroupsToExpandedGroups = (
	groups: Group[],
	themes: string[]
): {
	[key: (typeof themes)[number]]: GroupExpanded[]
} => {
	const expandedGroups = themes.reduce((acc, theme) => {
		acc[theme] = groups.map((group) => {
			return {
				...group,
				tokens: group.tokens.map((token) => {
					return {
						...token,
						value: token.value[themes.indexOf(theme)] as TokenValue
					}
				})
			}
		})
		return acc
	}, {} as { [key: (typeof themes)[number]]: GroupExpanded[] })

	return expandedGroups
}
