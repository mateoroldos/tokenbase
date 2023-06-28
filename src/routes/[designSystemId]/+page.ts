// import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup.js'
// import { redirect } from '@sveltejs/kit'
// import { get } from 'svelte/store'
// import { v4 as uuidv4 } from 'uuid'

// export const load = async ({ params }) => {
// 	const { designSystemId } = params

// 	const designTokensGroup = get(designTokensGroupStore).find(
// 		(group) => group.parentGroup === designSystemId
// 	)

// 	if (!designTokensGroup) {
// 		const newGroupId = uuidv4()

// 		designTokensGroupStore.addGroup('Default', newGroupId, designSystemId)

// 		throw redirect(302, `/${designSystemId}/${newGroupId}`)
// 	} else {
// 		throw redirect(302, `/${designSystemId}/${designTokensGroup.id}`)
// 	}
// }
