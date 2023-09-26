import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import type { ExportFileTypes } from './exportFileTypes'
import { FILE_TYPE_CONFIGS } from './exportFileTypes'

const styleDictionaryBuild = async (
	styleDictionaryJSON: string,
	exportTypes: ExportFileTypes[]
) => {
	fs.writeFileSync('/tokens', styleDictionaryJSON)

	let styleDictionaryConfig: Config = {
		source: [''],
		platforms: {}
	}

	styleDictionaryConfig.source = ['/tokens']

	let styleDictionary = StyleDictionary

	for (let i = 0; i < exportTypes.length; i++) {
		if (exportTypes[i] === 'tailwind') {
			const types = ['colors']

			for (let index = 0; index < types.length; index++) {
				styleDictionary = await StyleDictionary.extend(
					makeSdTailwindConfig({ type: 'all', source: ['/tokens'] })
				)
			}
		} else {
			styleDictionaryConfig.platforms[exportTypes[i] as ExportFileTypes] =
				FILE_TYPE_CONFIGS[exportTypes[i] as ExportFileTypes]
		}
	}

	styleDictionary = await styleDictionary.extend(styleDictionaryConfig)
	const styleDictionaryBuild = styleDictionary.buildAllPlatforms()
}

export default styleDictionaryBuild
