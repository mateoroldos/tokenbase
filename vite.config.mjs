import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import polyfillNode from 'rollup-plugin-polyfill-node'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), polyfillNode()],
	resolve: {
		alias: {
			http: false,
			https: false,
			crypto: 'crypto-browserify',
			events: 'events/',
			fs: 'memfs'
		}
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/]
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
}

export default config
