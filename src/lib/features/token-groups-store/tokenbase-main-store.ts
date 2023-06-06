import persistentWritable from '../../stores/custom/persistentWritable'

interface DesignSystemData {
	designSystems: DesignSystemReference[]
	activeDesignSystemRootId: string
}

interface DesignSystemReference {
	id: string
	name: string
}

export const createDesignSystemDataStore = () => {
	const { subscribe, update, set } = persistentWritable<DesignSystemData>(
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
		selectDesignSystem
	}
}

const tokenBaseMainStore = createDesignSystemDataStore()

export default tokenBaseMainStore
