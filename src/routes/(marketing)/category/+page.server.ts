import type { Post } from '../interface.js'

interface CategoryInfo {
	title: string
	count: number
}

export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/api/blog/posts.json`)
	const posts = await res.json()

	const uniqueCategories: { [key: string]: CategoryInfo } = {}
	const categorizedPosts: { [key: string]: Post[] } = {}

	posts.forEach((post: Post) => {
		post.categories.forEach((category: string) => {
			if (category !== undefined) {
				if (uniqueCategories.hasOwnProperty(category)) {
					;(uniqueCategories[category] as CategoryInfo).count += 1
				} else {
					uniqueCategories[category] = {
						title: category,
						count: 1
					}
				}
				if (categorizedPosts.hasOwnProperty(category)) {
					;(categorizedPosts[category] as Post[]).push(post)
				} else {
					categorizedPosts[category] = [post]
				}
			}
		})
	})

	const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) =>
		a.title.localeCompare(b.title)
	)

	return {
		uniqueCategories: sortedUniqueCategories,
		posts: categorizedPosts
	}
}
