import type { Group } from '$lib/features/token-groups-store/types/group.interface'

export const checkIfTokenHasDependencies = (groups: Group[]) => {
	const allTokens = groups.flatMap((group) => group.tokens)

	console.log(allTokens)
}
