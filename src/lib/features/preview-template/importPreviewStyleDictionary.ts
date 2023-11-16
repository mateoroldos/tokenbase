import { get } from 'svelte/store'
import styleDictionaryToGroups from '$lib/features/import-style-dictionary/buildGroupsFromJson'
import previewGroupsStore from './previewGroups'
//Aca deberia cambiar la store
const importPreviewStyleDictionary = (template: string, parentId: string) => {
	const newGroups = styleDictionaryToGroups(template, parentId)

	if (newGroups.find((g) => g.id === parentId)) {
		// delete old group from the store
		previewGroupsStore.deleteGroup(parentId)

		// add new groups to the store
		previewGroupsStore.set([...get(previewGroupsStore), ...newGroups])
	} else {
		previewGroupsStore.set([...get(previewGroupsStore), ...newGroups])
	}
}

export default importPreviewStyleDictionary
