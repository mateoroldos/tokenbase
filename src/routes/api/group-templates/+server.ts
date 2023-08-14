import type { Template } from '$lib/features/templates/templates/template-interface.js'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const overviewsDirectories = import.meta.glob(
		'/src/lib/features/templates/group-templates/*/overview.ts'
	)

	if (!overviewsDirectories) {
		throw error(400, 'Templates not found')
	}

	const iterableOverviews = Object.values(overviewsDirectories)

	const overviews = await Promise.all(
		iterableOverviews.map(async (resolver) => {
			const { overview } = await (resolver() as Promise<{
				overview: Template
			}>)

			return overview
		})
	)

	return json(overviews)
}
