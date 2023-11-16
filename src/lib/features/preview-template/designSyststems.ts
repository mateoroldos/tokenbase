import persistentWritable from '../../stores/custom/persistentWritable'

interface DesignSystemData {
	id: string
	name: string
}

export const createPreviewDesignSystemsStore = () => {
	const { subscribe, update, set } = persistentWritable<DesignSystemData[]>(
		'tokenbase-preview-design-systems',
		[]
	)

	const addDesignSystem = (id: string, name: string): void => {
		update((designSystems) => {
			designSystems.push({
				id,
				name
			})

			return designSystems
		})
	}

	const deleteDesignSystem = (id: string): void => {
		update((designSystems) => {
			designSystems = designSystems.filter((system) => system.id !== id)

			return designSystems
		})
	}

	return {
		subscribe,
		set,
		addDesignSystem,
		deleteDesignSystem
	}
}

const previewDesignSystemsStore = createPreviewDesignSystemsStore()

export default previewDesignSystemsStore
