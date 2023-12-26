import { json } from '@sveltejs/kit'
import fetchPosts from '../../../(marketing)/_assets/ts/fetchPosts'

export const GET = async () => {
	const { posts } = await fetchPosts()
	return json(posts)
}
