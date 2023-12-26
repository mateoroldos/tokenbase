import { error } from '@sveltejs/kit'
import type { Post } from '../post.interface'

export const load = async ({ params, fetch, url }) => {
	try {
		const post = (await import(
			`../../../../lib/blog-posts/${params.post}.md`
		)) as {
			default: ConstructorOfATypedSvelteComponent
			metadata: Post
		}

		const res = await fetch(`${url.origin}/api/blog/posts.json`)

		let posts: Post[] = await res.json()
		let categories = post.metadata.categories

		const relatedPosts = posts
			.filter(
				(p: Post) =>
					p.categories.some((category) => categories.includes(category)) &&
					p.slug !== params.post
			)
			.slice(0, 3)

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
