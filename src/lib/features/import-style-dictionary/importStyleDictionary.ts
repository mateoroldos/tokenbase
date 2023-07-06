import { get } from 'svelte/store'
import designTokensGroupStore from '../token-groups-store/groups'
import styleDictionaryToGroups from './buildGroupsFromJson'

const importStyleDictionary = (template: string, parentId: string) => {
	const newGroups = styleDictionaryToGroups(template, parentId)

	designTokensGroupStore.set([...get(designTokensGroupStore), ...newGroups])
}

export default importStyleDictionary
