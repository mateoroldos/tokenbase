import { sveltekit } from '@sveltejs/kit/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const BROWSERIFY_ALIASES = {
	assert: 'assert',
	events: 'events',
	fs: 'memfs',
	// module: EMPTY_MODULE_ID,
	path: 'path-browserify',
	process: 'process',
	util: 'util'
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true
				}),
				NodeModulesPolyfillPlugin()
			]
		}
	},
	resolve: {
		alias: {
			assert: 'assert',
			events: 'events',
			fs: 'memfs',
			// module: EMPTY_MODULE_ID,
			path: 'path-browserify',
			process: 'process',
			util: 'util',
			fs: 'memfs',
			process: '/process/browser',
			stream: 'stream-browserify',
			zlib: 'browserify-zlib',
			util: 'util',
			buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
		}
	}
}

export default config
