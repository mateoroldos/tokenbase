import StyleDictionary, { type Config } from 'browser-style-dictionary'
import { fs } from 'memfs'
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import type { ExportFileType } from './exportFileTypes'
import { FILE_TYPE_CONFIGS } from './exportFileTypes'

const buildStyleDictionaryJson = async (
	styleDictionaryJson: string,
	exportTypes: ExportFileType[],
	buildPath: string
) => {
	const JSON_TOKENS_PATH = '/tokens.json'
	const BUILD_PATH = `${buildPath.substring(1)}/`

	fs.writeFileSync(JSON_TOKENS_PATH, styleDictionaryJson)

	const styleDictionaryConfig: Config = {
		source: [JSON_TOKENS_PATH],
		platforms: {}
	}

	let styleDictionary = StyleDictionary

	for (const exportType of exportTypes) {
		if (exportType === 'tailwind') {
			const config = makeSdTailwindConfig({
				type: 'all',
				source: [JSON_TOKENS_PATH],
				buildPath: BUILD_PATH
			}) as Config

			styleDictionary = await styleDictionary.extend(config)
		} else {
			FILE_TYPE_CONFIGS[exportType].buildPath = BUILD_PATH
			styleDictionaryConfig.platforms[exportType] =
				FILE_TYPE_CONFIGS[exportType]
		}
	}

	const extendedStyleDictionary = await styleDictionary.extend(
		styleDictionaryConfig
	)
	extendedStyleDictionary.buildAllPlatforms()
}

export default buildStyleDictionaryJson
