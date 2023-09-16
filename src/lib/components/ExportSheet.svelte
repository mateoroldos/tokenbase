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
	import Separator from './ui/separator/separator.svelte'
	import { Code, Download } from 'lucide-svelte'

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

	const resetExportTypes = () => {
		exportTypes = []
	}
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button class="w-full" on:click={resetExportTypes}>
			<Code class="mr-2 h-4 w-4" />
			Export code
		</Button>
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Export Design System</Sheet.Title>
			<Sheet.Description>
				Select the file type you want to export. You can choose multiple file
				types.
			</Sheet.Description>
		</Sheet.Header>
		<div class="py-6">
			{#each EXPORT_FILE_TYPES as fileType, i}
				{#if i === 0}
					<Separator
						class="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50"
					/>
				{/if}
				<div
					class="flex cursor-pointer flex-row items-baseline justify-between px-5 py-4 transition-colors"
					on:click={() => handleToggleType(fileType.name)}
				>
					<div class="flex content-center justify-start gap-4">
						<div class="flex items-center">
							<Icon
								icon={fileType.icon}
								class={`h-6 w-6  ${
									exportTypes.includes(fileType.name)
										? 'text-slate-500'
										: 'text-slate-200'
								}`}
							/>
						</div>
						<div class="flex flex-col">
							<h3
								class="text-lg text-slate-300"
								class:text-slate-800={exportTypes.includes(fileType.name)}
							>
								{fileType.name}
							</h3>
						</div>
					</div>
					<div class="flex items-center justify-end">
						<Switch checked={exportTypes.includes(fileType.name)} />
					</div>
				</div>
				<Separator
					class="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50"
				/>
			{/each}
		</div>
		<Sheet.Footer>
			<Button
				disabled={exportTypes.length === 0}
				on:click={() => handleExport(exportTypes)}>Download</Button
			>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
