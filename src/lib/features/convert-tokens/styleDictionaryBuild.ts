import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'
import {
	FILE_TYPE_CONFIGS,
	type ExportFileTypes,
	type FileTypeConfig
} from './exportFileTypes'

const styleDictionaryBuild = async (
	styleDictionaryJSON: string,
	fileTypes: ExportFileTypes[]
) => {
	let styleDictionaryConfig: {
		source: string[]
		platforms: {
			[key: string]: FileTypeConfig
		}
	} = {
		source: [],
		platforms: {}
	}

	const sourcePath = '/src-tokens.json'
	styleDictionaryConfig.source = [sourcePath]
	fs.writeFileSync(sourcePath, styleDictionaryJSON)

	for (let i = 0; i < fileTypes.length; i++) {
		let fileType = fileTypes[i] as ExportFileTypes

		styleDictionaryConfig.platforms[fileType] = FILE_TYPE_CONFIGS[fileType]
	}

	const styleDictionary = await StyleDictionary.extend(styleDictionaryConfig)

	styleDictionary.buildAllPlatforms()
}

export default styleDictionaryBuild
