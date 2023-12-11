import type { GroupExpanded } from '../../../token-groups-store/types/group.interface'
import type { StyleDictonaryGroup } from '../../types/style-dictionary-group.interface'
import type { StyleDictionaryJson } from '../../types/style-dictionary-json.type'
import { transformTokenToStyleDictionaryToken } from '../tokenTransforms/transformTokenToStyleDictionaryToken'

export const transformGroupsToStyleDictionaryJson = (
	groups: GroupExpanded[],
	designSystemId: string
): StyleDictionaryJson => {
	const tree = transformGroupsToStyleDictionaryObject(groups, designSystemId)

	const json = JSON.stringify(tree, null, 2)

	if (json.startsWith('{') && json.endsWith('}')) {
		return json as StyleDictionaryJson
	} else {
		throw new Error('Could not transform groups to Style Dictionary JSON')
	}
}

const transformGroupsToStyleDictionaryObject = (
	groups: GroupExpanded[],
	parentId: string
): StyleDictonaryGroup => {
	let nodes: StyleDictonaryGroup = {}

	groups.forEach((group) => {
		if (group.parentGroup === parentId) {
			const subtree = transformGroupsToStyleDictionaryObject(groups, group.id)
			const tokens = transformTokenToStyleDictionaryToken(group.tokens)

			const node: StyleDictonaryGroup = {
				[group.name]: {
					...tokens,
					...subtree
				}
			}

			nodes = {
				...nodes,
				...node
			}
		}
	})

	return nodes
}
