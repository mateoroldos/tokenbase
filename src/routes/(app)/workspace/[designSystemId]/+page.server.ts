import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, parent }) => {
	await parent()
}
