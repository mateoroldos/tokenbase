import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		nodePolyfills({
			exclude: ['fs'],
			protocolImports: true
		})
	],
	resolve: {
		alias: {
			fs: 'memfs',
			path: 'node:path',
			stream: 'node:stream',
			url: 'node:url',
			util: 'node:util'
		}
	},
	ssr: {
		noExternal: process.env.NODE_ENV === 'production' ? true : []
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
