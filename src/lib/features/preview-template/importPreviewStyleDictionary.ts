import { get } from 'svelte/store'
import previewGroupsStore from './previewGroups'
import styleDictionaryToGroups from '../import-style-dictionary/functions/buildGroupsFromJson'

//Aca deberia cambiar la store
const importPreviewStyleDictionary = (template: string, parentId: string) => {
	const newGroups = styleDictionaryToGroups(template, parentId, [
		{
			name: 'light',
			id: 'light'
		}
	])

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
