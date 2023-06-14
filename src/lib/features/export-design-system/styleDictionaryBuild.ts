import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'
import type { ExportFileTypes, FileTypeConfig } from './exportFileTypes'
import { FILE_TYPE_CONFIGS } from './exportFileTypes';

interface StyleDictionaryConfig {
	source: string[]
	platforms: {
		[key in ExportFileTypes]: FileTypeConfig
	}
}

const styleDictionaryBuild = async (
	styleDictionaryJSON: string,
	exportTypes: ExportFileTypes[]
) => {
	fs.writeFileSync('/tokens', styleDictionaryJSON)

	let styleDictionaryConfig = {
		source: [''],
		platforms: {}
	}

	styleDictionaryConfig.source = ['/tokens']


	for (let i = 0; i < exportTypes.length; i++) {
		styleDictionaryConfig.platforms[algo] = FILE_TYPE_CONFIGS[exportTypes[i]]
	}


	const styleDictionary = await StyleDictionary.extend(styleDictionaryConfig)
	const styleDictionaryBuild = styleDictionary.buildAllPlatforms()
}

export default styleDictionaryBuild
