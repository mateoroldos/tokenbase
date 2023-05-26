import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'

const FAKE_DATA = {
	tokens: {
		'Token de color': {
			value: '#966C71',
			type: 'color'
		},
		ssa: {
			value: ['Arial'],
			type: 'fontFamily'
		},
		fsfas: {
			value: '#966C71',
			type: 'color'
		}
	}
}

export const FAKE_DATA_JSON = JSON.stringify(FAKE_DATA)

export let STYLE_DICTIONARY_CONFIG = {
	source: [],
	platforms: {
		css: {
			transformGroup: 'scss',
			buildPath: 'build/',
			files: [
				{
					destination: 'variables.css',
					format: 'scss/variables'
				}
			]
		}
	}
}

const styleDictionaryBuild = async (
	styleDictionaryJSON: string,
	styleDictionaryConfig: Config,
	filePath: string
) => {
	fs.writeFileSync(filePath, styleDictionaryJSON)

	styleDictionaryConfig.source = [filePath]

	const styleDictionary = await StyleDictionary.extend(styleDictionaryConfig)
	const styleDictionaryBuild = styleDictionary.buildAllPlatforms()

	console.log(fs.readFileSync('/build/variables.css', 'utf8'))
}

export default styleDictionaryBuild
