import { vitePreprocess } from '@sveltejs/kit/vite'
import preprocess from 'svelte-preprocess'
import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: [
		preprocess(),
		vitePreprocess({}),
		sequence([
			// ... other preprocessors
			preprocessMeltUI() // add to the end!
		])
	],
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
