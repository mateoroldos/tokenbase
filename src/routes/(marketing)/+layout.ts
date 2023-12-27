import { error } from '@sveltejs/kit'

// Ensures all pages under this layout (which is all of them) are statically prerendered at build time
// export const prerender = true
// export const csr = true

export const load = async ({ url }) => {
	try {
		return {
			path: url.pathname
		}
	} catch (err) {
		if (err instanceof Error) {
			throw error(404, err)
		} else {
			throw error(404, err as string)
		}
	}
}
