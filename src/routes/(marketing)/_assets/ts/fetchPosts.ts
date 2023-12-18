import { postsPerPage } from '../../../../lib/config'

export interface Metadata {
	metadata: {
		title: string
		date: string
		updated: string
		categories: string[]
		coverImage: string
		coverWidth: number
		coverHeight: number
		excerpt: string
		author: string
	}
}

const fetchPosts = async ({
	offset = 0,
	limit = postsPerPage,
	category = ''
} = {}) => {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/blog-posts/*.md')).map(
			async ([path, resolver]) => {
				const { metadata } = (await resolver()) as Metadata
				const slug = path ? path.split('/').pop()?.slice(0, -3) : undefined
				return { ...metadata, slug }
			}
		)
	)

	let sortedPosts = posts.sort((a, b) => {
		const dateA = new Date(a.date).getTime()
		const dateB = new Date(b.date).getTime()
		return dateB - dateA
	})

	if (category) {
		sortedPosts = sortedPosts.filter((post) =>
			post.categories.includes(category)
		)
	}

	if (offset) {
		sortedPosts = sortedPosts.slice(offset)
	}

	if (limit && limit < sortedPosts.length && limit != -1) {
		sortedPosts = sortedPosts.slice(0, limit)
	}

	sortedPosts = sortedPosts.map((post) => ({
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		coverImage: post.coverImage,
		coverWidth: post.coverWidth,
		coverHeight: post.coverHeight,
		date: post.date,
		categories: post.categories,
		updated: post.updated,
		author: post.author
	}))

	return {
		posts: sortedPosts
	}
}

export default fetchPosts
