import { json } from '@sveltejs/kit'
import fetchPosts from '../../../../../(marketing)/_assets/ts/fetchPosts.js'
import { postsPerPage } from '$lib/config'

export const prerender = true

export const GET = async ({ params }) => {
	const { page } = params || 1

	const options = {
		offset: (Number(page) - 1) * postsPerPage,
		limit: postsPerPage
	}

	const { posts } = await fetchPosts(options)

	return json(posts)
}
