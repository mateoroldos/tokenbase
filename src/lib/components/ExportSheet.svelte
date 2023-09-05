<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/groups'
	import buildStyleDictionaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'
	import { fs } from 'memfs'
	import styleDictionaryBuild from '$lib/features/export-design-system/styleDictionaryBuild'
	import {
		FILE_TYPE_CONFIGS,
		type ExportFileTypes,
		EXPORT_FILE_TYPES
	} from '$lib/features/export-design-system/exportFileTypes'
	import * as Sheet from '$lib/components/ui/sheet'
	import { Button } from '$lib/components/ui/button'
	import { Switch } from '$lib/components/ui/switch'
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'

	let exportTypes: ExportFileTypes[] = []

	const handleExport = async (exportTypes: ExportFileTypes[]) => {
		let designSystemId = $page.params.designSystemId

		if (designSystemId) {
			await styleDictionaryBuild(
				buildStyleDictionaryJson($designTokensGroupStore, designSystemId),
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

<Sheet.Root>
	<Sheet.Trigger>
		<Button class="w-full">Export</Button>
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Choose your export type</Sheet.Title>
			<Sheet.Description>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-5">
						{#each EXPORT_FILE_TYPES as fileType}
							<div class=" flex cursor-pointer flex-row justify-between">
								<div class="flex content-center justify-start gap-6">
									<div class="flex items-center">
										<Icon icon={fileType.icon} class="h-6 w-6 " />
									</div>
									<div class="flex flex-col">
										<h3 class="text-lg text-black">{fileType.name}</h3>
										<p>File description goes here</p>
									</div>
								</div>
								<div class="flex items-center justify-end">
									<button on:click={() => handleToggleType(fileType.name)}>
										<Switch />
									</button>
								</div>
							</div>
						{/each}
					</div>
					<Button on:click={() => handleExport(exportTypes)}>Create file</Button
					>
				</div>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
