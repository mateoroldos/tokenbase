import persistentWritable from '../../stores/custom/persistentWritable'
import type { DesignSystemOverview } from './types/design-system-overview.interface'

export const createDesignSystemsOverviewsStore = () => {
	const { subscribe, update, set } = persistentWritable<DesignSystemOverview[]>(
		'tokenbase-design-systems',
		[]
	)

	const addDesignSystem = (id: string, name: string): void => {
		update((designSystems) => {
			designSystems.push({
				id,
				name,
				themes: ['Default']
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

	const addTheme = (id: string, themeName: string): void => {
		update((designSystems) => {
			const designSystem = designSystems.find((system) => system.id === id)

			if (designSystem) {
				designSystem.themes.push(themeName)
			}

			return designSystems
		})
	}

	return {
		subscribe,
		set,
		addDesignSystem,
		deleteDesignSystem,
		addTheme
	}
}

const designSystemsOverviewsStore = createDesignSystemsOverviewsStore()

export default designSystemsOverviewsStore
