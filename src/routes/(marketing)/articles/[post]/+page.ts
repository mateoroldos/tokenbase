import { error } from '@sveltejs/kit'
import type { Post } from '../../interface.js'

export const prerender = false

export const load = async ({ params, fetch }) => {
	try {
		const post = await import(`../../../../lib/blog-posts/${params.post}.md`)
		const res = await fetch(`/api/blog/posts.json`)

		let posts = await res.json()
		let categories = post.metadata.categories

		const relatedPosts = posts.filter(
			(p: Post) =>
				p.categories.some((category) => categories.includes(category)) &&
				p.slug !== params.post
		)

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post },
			relatedPosts
		}
	} catch (err) {
		if (err instanceof Error) {
			throw error(404, err)
		} else {
			throw error(404, err as string)
		}
	}
}
