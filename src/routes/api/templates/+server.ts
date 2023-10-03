import type { Template } from '$lib/features/templates/types/template-interface.js'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const overviewsDirectories = import.meta.glob(
		'/src/lib/features/templates/templates/*/overview.ts'
	)

	if (!overviewsDirectories) {
		throw error(400, 'Templates not found')
	}

	const iterableOverviews = Object.entries(overviewsDirectories)

	const overviews = await Promise.all(
		iterableOverviews.map(async ([path, resolver]) => {
			const { overview } = await (resolver() as Promise<{
				overview: Template
			}>)

			return {
				...overview,
				path,
				slug: path.split('/').slice(-2)[0]
			}
		})
	)

	return json(overviews)
}
