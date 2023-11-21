import persistentWritable from '../../stores/custom/persistentWritable'
import type { DesignSystemOverview } from './types/design-system-overview.interface'
import { v4 as uuidv4 } from 'uuid'

export const createDesignSystemsOverviewsStore = () => {
	const { subscribe, update, set } = persistentWritable<DesignSystemOverview[]>(
		'tokenbase/design-systems',
		[]
	)

	const addDesignSystem = (id: string, name: string): void => {
		update((designSystems) => {
			designSystems.push({
				id,
				name,
				themes: [
					{
						id: uuidv4(),
						name: 'light'
					}
				]
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

	const addTheme = (
		designSystemId: string,
		themeName: string,
		themeId: string
	): void => {
		update((designSystems) => {
			const designSystem = designSystems.find(
				(system) => system.id === designSystemId
			)

			if (designSystem) {
				designSystem.themes.push({
					id: themeId,
					name: themeName
				})
			}

			return designSystems
		})
	}

	const deleteTheme = (designSystemId: string, themeId: string): void => {
		update((designSystems) => {
			const designSystem = designSystems.find(
				(system) => system.id === designSystemId
			)

			if (designSystem) {
				designSystem.themes = designSystem.themes.filter(
					(theme) => theme.id !== themeId
				)
			}

			return designSystems
		})
	}

	return {
		subscribe,
		set,
		addDesignSystem,
		deleteDesignSystem,
		addTheme,
		deleteTheme
	}
}

const designSystemsOverviewsStore = createDesignSystemsOverviewsStore()

export default designSystemsOverviewsStore
