import { get } from 'svelte/store'
import designTokensGroupStore from '../token-groups-store/tokensGroup'
import styleDictionaryToGroups from './buildGroupsFromJson'

const importStyleDictionary = (template: string, groupId: string) => {
	const newGroups = styleDictionaryToGroups(template, groupId)

	designTokensGroupStore.set([...get(designTokensGroupStore), ...newGroups])
}

export default importStyleDictionary
