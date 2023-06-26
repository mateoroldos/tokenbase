<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import buildStyleDictionaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson';
	import { fs } from 'memfs'
	import styleDictionaryBuild from '$lib/features/export-design-system/styleDictionaryBuild'
	import { FILE_TYPE_CONFIGS, type ExportFileTypes, EXPORT_FILE_TYPES } from '$lib/features/export-design-system/exportFileTypes'

	let exportTypes: ExportFileTypes[] = []

	const handleExport = async (exportTypes: ExportFileTypes[]) => {
		await styleDictionaryBuild(
			buildStyleDictionaryJson($designTokensGroupStore),
			exportTypes
		)

		for (let i = 0; i < exportTypes.length; i++) {
			downloadFile(
				`/${FILE_TYPE_CONFIGS[exportTypes[i] as ExportFileTypes].buildPath}${
					FILE_TYPE_CONFIGS[exportTypes[i] as ExportFileTypes].files[0]
						?.destination
				}`
			)
		}
	}

	const handleToggleType = (type: ExportFileTypes) => {
		if (exportTypes.includes(type)) {
			exportTypes = exportTypes.filter((exportType) => exportType !== type)
		} else {
			exportTypes = [...exportTypes, type]
		}
	}

	const downloadFile = (path: string) => {
		const a = document.createElement('a')
		a.href = URL.createObjectURL(new Blob([fs.readFileSync(path)]))
		a.download = path

		a.click()
	}
</script>

<section class="flex flex-1 flex-col justify-between p-8">
	<h2>Export tokens</h2>
	<div class="flex flex-row gap-5">
		{#each EXPORT_FILE_TYPES as fileType}
			<div
				class="w-fit cursor-pointer bg-gray-100 p-6"
				class:bg-gray-400={exportTypes.includes(fileType)}
				on:click={() => handleToggleType(fileType)}
			>
				{fileType}
			</div>
		{/each}
	</div>
	<button class="bg-blue-300 px-6" on:click={() => handleExport(exportTypes)}
		>Create file</button
	>
</section>
