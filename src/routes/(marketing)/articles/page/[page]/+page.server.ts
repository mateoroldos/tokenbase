import { redirect } from '@sveltejs/kit'
import fetchPosts from '../../../_assets/ts/fetchPosts.js'
import { postsPerPage } from '../../../../../lib/config.js'

export const prerender = false

export const load = async ({ url, params, fetch }) => {
	const page = parseInt(params.page) || 1
	if (page <= 1) {
		throw redirect(301, '/articles')
	}

	let offset = page * postsPerPage - postsPerPage

	const totalPostsRes = await fetch(`${url.origin}/api/blog/posts/count`)
	const total = Number(await totalPostsRes.json())
	const { posts } = await fetchPosts({ offset })

	return {
		posts,
		page,
		totalPosts: total
	}
}
