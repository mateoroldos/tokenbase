import { vitePreprocess } from '@sveltejs/kit/vite'
import preprocess from 'svelte-preprocess'
import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'
import adapter from '@sveltejs/adapter-cloudflare'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess(),
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		}),
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
		},
		prerender: {
			entries: [
				'/api/blog/posts/page/*',
				// '/category/*/page/*',
				// '/category/page/*',
				// '/page/*',
				'/about',
				'/articles',
				'/category'
			]
		}
	},
	shadcn: {
		componentPath: './src/lib/components/ui'
	}
}
export default config
