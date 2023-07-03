<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import buildStyleDictionaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'
	import { fs } from 'memfs'
	import styleDictionaryBuild from '$lib/features/export-design-system/styleDictionaryBuild'
	import {
		FILE_TYPE_CONFIGS,
		type ExportFileTypes,
		EXPORT_FILE_TYPES
	} from '$lib/features/export-design-system/exportFileTypes'
	import {
		Sheet,
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$components/ui/sheet'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$components/ui/card'
	import { Button } from '$components/ui/button'
	import Separator from '$components/ui/separator/Separator.svelte'
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte'
	import Switch from '$components/ui/switch/Switch.svelte'

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
	<Sheet>
		<SheetTrigger><Button>Export options</Button></SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Choose your export type</SheetTitle>
				<SheetDescription>
					<div class="flex flex-col gap-3">
						<div class="grid grid-cols-2 gap-5">
							{#each EXPORT_FILE_TYPES as fileType}
								<div
									class="w-fit cursor-pointer"
									on:click={() => handleToggleType(fileType)}
								>
									<div class="flex gap-4">
										<Switch />
										<p>{fileType}</p>
									</div>
								</div>
							{/each}
						</div>
						<Button
							class="bg-blue-300 px-6"
							on:click={() => handleExport(exportTypes)}>Create file</Button
						>
					</div>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	</Sheet>
	<h2>Export tokens</h2>
</section>
