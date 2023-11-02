import { fs } from 'memfs'
import { FILE_TYPE_CONFIGS, type ExportFileType } from './exportFileTypes'
import { get } from 'svelte/store'
import transformDesignSystemToStyleDictionaryJsons from './transforms'
import designTokensGroupStore from '$lib/features/token-groups-store/groups'
import buildStyleDictionaryJson from './buildStyleDictionaryJson'
import { downloadDirectory } from './utils/downloadDirectory'
import type { DesignSystemOverview } from '../token-groups-store/types/design-system-overview.interface'

export const downloadDesignSystem = async (
	designSystemOverview: DesignSystemOverview,
	exportTypes: ExportFileType[]
) => {
	const styleDictionaryJsons = transformDesignSystemToStyleDictionaryJsons(
		get(designTokensGroupStore),
		designSystemOverview.themes,
		designSystemOverview.id
	)

	const downloadPromises = []

	for (const theme of designSystemOverview.themes) {
		const DIRECTORY_PATH = `/${theme}`

		if (!fs.existsSync(DIRECTORY_PATH)) {
			fs.mkdirSync(DIRECTORY_PATH)
		}

		for (const exportType of exportTypes) {
			const EXPORT_TYPE_CONFIG = FILE_TYPE_CONFIGS[exportType]
			const styleDictionaryJson = styleDictionaryJsons[theme]

			if (styleDictionaryJson) {
				if (exportType !== 'json') {
					await buildStyleDictionaryJson(
						styleDictionaryJson,
						[exportType],
						DIRECTORY_PATH
					)
				} else {
					const FILE_NAME = EXPORT_TYPE_CONFIG.files[0]?.destination
					fs.writeFileSync(
						`${DIRECTORY_PATH}/${FILE_NAME}`,
						styleDictionaryJson
					)
				}
			}
		}

		downloadPromises.push(downloadDirectory(DIRECTORY_PATH))
	}

	// Wait for all downloads to complete
	await Promise.all(downloadPromises)

	// Clean up: Delete all directories and their contents
	for (const theme of designSystemOverview.themes) {
		const DIRECTORY_PATH = `/${theme}`
		fs.rmdirSync(DIRECTORY_PATH, { recursive: true })
	}
}
