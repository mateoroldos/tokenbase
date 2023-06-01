// import { v4 as uuidv4 } from 'uuid'
// import { createTokensGroupStore } from './tokensGroup'
// import persistentWritable from '../../stores/custom/persistentWritable'

// export interface DesignSystem {
// 	id: string
// 	name: string
// 	groups: ReturnType<typeof createTokensGroupStore>['subscribe']
// }

// export const createDesignSystemStore = () => {
// 	const { subscribe, update, set } = persistentWritable<DesignSystem[]>(
// 		'designSystems',
// 		[]
// 	)
// 	const addDesignSystem = (name: string): void => {
// 		update((designSystems) => {
// 			const tokensGroupStore = createTokensGroupStore()
// 			const newDesignSystem: DesignSystem = {
// 				id: uuidv4(),
// 				name,
// 				groups: tokensGroupStore.subscribe
// 			}

// 			designSystems.push(newDesignSystem)
// 			return designSystems
// 		})
// 	}

// 	const deleteDesignSystem = (designSystemId: string): void => {
// 		update((designSystems) => {
// 			const index = designSystems.findIndex((ds) => ds.id === designSystemId)
// 			if (index !== -1) {
// 				designSystems.splice(index, 1)
// 			}
// 			return designSystems
// 		})
// 	}

// 	return {
// 		subscribe,
// 		set,
// 		addDesignSystem,
// 		deleteDesignSystem
// 	}
// }

// const designSystemStore = createDesignSystemStore()

// export default designSystemStore
