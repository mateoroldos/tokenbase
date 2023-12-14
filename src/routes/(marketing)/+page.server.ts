import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'

export const load = async ({ locals, url, fetch }) => {
	const session = await locals.auth.validate()

	if (session) throw redirect(302, '/workspace')

	const postRes = await fetch(`${url.origin}/api/blog/posts.json`)
	const posts = await postRes.json()

	const totalRes = await fetch(`${url.origin}/api/blog/posts/count`)
	const total = await totalRes.json()

	return { posts, total }
}
