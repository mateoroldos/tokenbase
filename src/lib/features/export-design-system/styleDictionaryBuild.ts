import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'
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

	for (let i = 0; i < exportTypes.length; i++) {
		styleDictionaryConfig.platforms[exportTypes[i] as ExportFileTypes] =
			FILE_TYPE_CONFIGS[exportTypes[i] as ExportFileTypes]
	}

	const styleDictionary = await StyleDictionary.extend(styleDictionaryConfig)
	const styleDictionaryBuild = styleDictionary.buildAllPlatforms()
}

export default styleDictionaryBuild
