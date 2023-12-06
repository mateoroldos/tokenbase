import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), nodePolyfills()],
	resolve: {
		alias: {
			fs: 'memfs',
			axios: 'isomorphic-fetch'
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
