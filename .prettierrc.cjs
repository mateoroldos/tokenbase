module.exports = {
	semi: false,
	useTabs: true,
	singleQuote: true,
	trailingComma: "none",
	printWidth: 60,
	plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	pluginSearchDirs: false,
}
