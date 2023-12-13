import { json } from '@sveltejs/kit'
import { postsPerPage } from '../../../(marketing)/config'
import fetchPosts from '../../../(marketing)/_assets/ts/fetchPosts'

export const prerender = true

export const GET = async () => {
	const options = {
		limit: postsPerPage
	}

	const { posts } = await fetchPosts(options)
	return json(posts)
}
