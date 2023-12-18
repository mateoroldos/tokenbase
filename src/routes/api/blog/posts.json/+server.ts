import { json } from '@sveltejs/kit'
import { postsPerPage } from '../../../../lib/config'
import fetchPosts from '../../../(marketing)/_assets/ts/fetchPosts'

export const prerender = true

export const GET = async ({ url }) => {
	const options = {
		limit: Number(url.searchParams.get('count')) ?? postsPerPage
	}

	const { posts } = await fetchPosts(options)
	return json(posts)
}
