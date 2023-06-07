import persistentWritable from '../../stores/custom/persistentWritable'

interface DesignSystemsData {
	designSystems: DesignSystemReference[]
	activeDesignSystemRootId: string
}

interface DesignSystemReference {
	id: string
	name: string
}

export const createDesignSystemsDataStore = () => {
	const { subscribe, update, set } = persistentWritable<DesignSystemsData>(
		'tokenbase-main',

		{
			designSystems: [],
			activeDesignSystemRootId: ''
		}
	)

	const addDesignSystem = (id: string, name: string): void => {
		update((designSystems) => {
			designSystems.designSystems.push({
				id,
				name
			})

			return designSystems
		})
	}
	const deleteDesignSystem = (id: string): void => {
		update((designSystems) => {
			designSystems.designSystems = designSystems.designSystems.filter(
				(system) => system.id !== id
			)

			if (designSystems.activeDesignSystemRootId === id) {
				designSystems.activeDesignSystemRootId = ''
			}

			return designSystems
		})
	}

	const selectDesignSystem = (id: string): void => {
		update((designSystems) => {
			designSystems.activeDesignSystemRootId = id

			return designSystems
		})
	}

	return {
		subscribe,
		set,
		addDesignSystem,
		deleteDesignSystem,
		selectDesignSystem
	}
}

const tokenBaseMainStore = createDesignSystemsDataStore()

export default tokenBaseMainStore
