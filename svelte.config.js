import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: [preprocess()],
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			'$components/*': 'src/lib/components/*'
		}
	},
	shadcn: {
		componentPath: './src/lib/components/ui'
	}
}
export default config
