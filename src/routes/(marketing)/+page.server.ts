import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, url, fetch }) => {
	const session = await locals.auth.validate()

	if (session) throw redirect(302, '/workspace')

	const postRes = await fetch(`${url.origin}/api/blog/posts.json?count=3`)
	const posts = await postRes.json()

	return { posts }
}
