import type { Post } from './post.interface.js'

export const load = async ({ url, fetch }) => {
	const postRes = await fetch(`${url.origin}/api/blog/posts.json`)
	const posts: Post[] = await postRes.json()

	const totalRes = await fetch(`${url.origin}/api/blog/posts/count`)
	const total = Number(await totalRes.json())

	return { posts, totalPosts: total }
}
