import fetchPosts from '../../_assets/ts/fetchPosts.js'

export const load = async ({ params }) => {
	const category = params.category
	const options = { category, limit: -1 }
	const { posts } = await fetchPosts(options)

	return {
		posts,
		category,
		total: posts.length
	}
}
