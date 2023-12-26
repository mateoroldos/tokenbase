import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		nodePolyfills({
			exclude: ['fs']
		})
	],
	resolve: {
		alias: {
			fs: 'memfs'
		}
	},
	ssr: {
		noExternal: process.env.NODE_ENV === 'production' ? true : []
	}
}

export default config
