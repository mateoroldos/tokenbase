import { get } from 'svelte/store'
import designTokensGroupStore from '../token-groups-store/groupsStore'
import styleDictionaryToGroups from './buildGroupsFromJson'

const importStyleDictionary = (template: string, parentId: string) => {
	const newGroups = styleDictionaryToGroups(template, parentId)

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
