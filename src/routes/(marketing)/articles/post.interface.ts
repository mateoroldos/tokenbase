export interface Post {
	title: string
	date: string
	author: string
	updated: string
	categories: string[]
	coverImage: string
	coverWidth: number
	coverHeight: number
	excerpt: string
	slug: string | undefined
}
