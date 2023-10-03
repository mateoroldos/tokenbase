import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const overviewFile = await import(
		`../../../../lib/features/templates/templates/${params.templateSlug}/overview.ts`
	)
	const templateFile = await import(
		`../../../../lib/features/templates/templates/${params.templateSlug}/template.json`
	)

	if (!overviewFile || !templateFile) {
		throw error(400, 'Templates not found')
	}

	return json({
		overview: overviewFile,
		template: templateFile.default
	})
}
