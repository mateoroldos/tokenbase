import { fs } from 'memfs'
import {
	FILE_TYPE_CONFIGS,
	type ExportFileType
} from './config/exportFileTypes'
import { get } from 'svelte/store'
import transformDesignSystemToStyleDictionaryJsons from './transforms/transformDesignSystemToStyleDictionaryJsons'
import designTokensGroupStore from '$lib/features/token-groups-store/groupsStore'
import buildStyleDictionaryJson from './functions/buildStyleDictionaryJson'
import { downloadDirectory } from './utils/downloadDirectory'
import type { DesignSystemOverview } from '../token-groups-store/types/design-system-overview.interface'
import { addToast } from '../toast/stores/toastStore'

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
		const DIRECTORY_PATH = `/${theme.name}`

		if (!fs.existsSync(DIRECTORY_PATH)) {
			fs.mkdirSync(DIRECTORY_PATH)
		}

		for (const exportType of exportTypes) {
			const EXPORT_TYPE_CONFIG = FILE_TYPE_CONFIGS[exportType]
			const styleDictionaryJson = styleDictionaryJsons[theme.name]

			if (styleDictionaryJson) {
				if (exportType !== 'json') {
					await buildStyleDictionaryJson(
						styleDictionaryJson,
						[exportType],
						DIRECTORY_PATH
					)
					addToast(`Design system exported! Type: ${exportType}`,"success")
				} else {
					const FILE_NAME = EXPORT_TYPE_CONFIG.files[0]?.destination
					fs.writeFileSync(
						`${DIRECTORY_PATH}/${FILE_NAME}`,
						styleDictionaryJson
					)
					addToast(`Design system exported! Type: ${exportType}`,"success")
				}
			}
		}

		downloadPromises.push(downloadDirectory(DIRECTORY_PATH))
	}

	// Wait for all downloads to complete
	await Promise.all(downloadPromises)

	// Clean up: Delete all directories and their contents
	for (const theme of designSystemOverview.themes) {
		const DIRECTORY_PATH = `/${theme.name}`
		fs.rmdirSync(DIRECTORY_PATH, { recursive: true })
	}
}
