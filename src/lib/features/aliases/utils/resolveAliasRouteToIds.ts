import { addToast } from '$lib/features/toast/stores/toastStore'
import type { Group } from '$lib/features/token-groups-store/types/group.interface'
import type { IToken } from '$lib/features/token-groups-store/types/token.interface'

export const resolveAliasRouteToIds = (
	aliasRoute: `{${string}}`,
	groups: Group[],
	designSystemId: string
):
	| {
			groupId: string
			tokenId: string
	  }
	| undefined => {
	const aliasRouteArray = aliasRoute
		.replace('{', '')
		.replace('}', '')
		.split('.')

	const groupsRouteArray = aliasRouteArray.slice(0, aliasRouteArray.length - 1)

	const tokenName = aliasRouteArray[aliasRouteArray.length - 1]

	const referencedGroup = groupsRouteArray.reduce(
		(acc, groupName) => {
			const group = findGroupByNameAndParentId(groupName, acc.id, groups)

			if (group) {
				return group
			} else {
				addToast(`Group ${groupName} not found in parent group ${acc.name}`, "error")

				throw new Error(
					
					`Group ${groupName} not found in parent group ${acc.name}`
				)
			}
		},
		{ id: designSystemId, name: 'Design System', parentGroup: '' } as Group
	)

	let referencedToken: IToken | undefined

	if (referencedGroup) {
		referencedToken = referencedGroup.tokens.find((t) => t.name === tokenName)
	}

	if (referencedGroup && referencedToken) {
		return {
			groupId: referencedGroup.id,
			tokenId: referencedToken.id
		}
	} else {
		return undefined
	}
}

const findGroupByNameAndParentId = (
	groupName: string,
	parentId: string,
	groups: Group[]
): Group | undefined => {
	const group = groups.find(
		(g) => g.name === groupName && g.parentGroup === parentId
	)

	if (group) {
		return group
	} else {
		return undefined
	}
}
