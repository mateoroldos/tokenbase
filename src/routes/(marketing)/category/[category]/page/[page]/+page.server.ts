import { redirect } from '@sveltejs/kit'
import fetchPosts from '../../../../_assets/ts/fetchPosts.js'
import { postsPerPage } from '../../../../config.js'

export const prerender = false

export const load = async ({ url, params, fetch }) => {
	const page = parseInt(params.page) || 1
	const { category } = params

	if (page <= 1) {
		throw redirect(301, `/category/${category}`)
	}

	let offset = page * postsPerPage - postsPerPage

	const totalPostsRes = await fetch(`${url.origin}/api/posts/count`)
	const total = await totalPostsRes.json()
	const { posts } = await fetchPosts({ offset, category })

	return {
		posts,
		page,
		category,
		totalPosts: total
	}
}
