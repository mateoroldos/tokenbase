import { get } from 'svelte/store'
import designTokensGroupStore from '../token-groups-store/groupsStore'
import styleDictionaryToGroups from './functions/buildGroupsFromJson'
import type { Theme } from '../token-groups-store/types/design-system-overview.interface'

const importStyleDictionary = (
	template: string,
	parentId: string,
	themes: Theme[]
) => {
	const newGroups = styleDictionaryToGroups(template, parentId, themes)

	if (newGroups.find((g) => g.id === parentId)) {
		// delete old group from the store
		designTokensGroupStore.deleteGroup(parentId)

		// add new groups to the store
		designTokensGroupStore.set([...get(designTokensGroupStore), ...newGroups])
	} else {
		designTokensGroupStore.set([...get(designTokensGroupStore), ...newGroups])
	}
}

export default importStyleDictionary
