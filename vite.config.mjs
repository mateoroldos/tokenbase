import { sveltekit } from '@sveltejs/kit/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		rollupNodePolyFill({
			exclude: ['fs'],
			protocolImports: true
		})
	],
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()]
		}
	},
	resolve: {
		alias: {
			fs: 'memfs'
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
