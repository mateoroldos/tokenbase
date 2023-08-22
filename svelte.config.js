import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: [preprocess(), vitePreprocess({})],
	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			'$lib/*': './src/lib/*'
		}
	},
	shadcn: {
		componentPath: './src/lib/components/ui'
	}
}
export default config
