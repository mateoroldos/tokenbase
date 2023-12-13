import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), nodePolyfills()],
	resolve: {
		alias: {
			fs: 'memfs'
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
	// server: {
	// 	fs: {
	// 		allow: ['.']
	// 	}
	// }
}

export default config
