<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import jsonSuite from '../token-management/jsonSuite'
	import InputFiles from '$lib/components/ui/input/InputFiles.svelte'
	import { createEventDispatcher, getContext } from 'svelte'
	import type { Theme } from '../token-groups-store/types/design-system-overview.interface'
	import type { Readable } from 'svelte/store'
	import { addToast } from '../toast/stores/toastStore'

	let json: string
	let desingSystemId: string
	let jsonFile: File
	
	const activeDesignSystemThemesStore: Readable<Theme[]> = getContext(
		'activeDesignSystemThemesStore'
	)

	function handleSubmit(event: Event) {
		const textarea = event.target as HTMLTextAreaElement
		json = textarea.value
		desingSystemId = $page.params.designSystemId as string
		res = jsonSuite(json, event.target.name)
	}
	const dispatch = createEventDispatcher()
	let res = jsonSuite.get()

	const createDesignSystemFromJson = async () => {
		try {
			if (jsonFile) {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader()
					fileReader.readAsText(jsonFile[0])
					fileReader.onload = () => {
						const desingSystemId = $page.params.designSystemId as string
						importStyleDictionary(
							fileReader.result as string,
							desingSystemId,
							$activeDesignSystemThemesStore
						)
						dispatch('load-template', jsonFile)
						closeModal()
					}
				})
			} else {
				importStyleDictionary(
					json,
					desingSystemId,
					$activeDesignSystemThemesStore
				)
				dispatch('load-template', jsonFile)
				closeModal()
			}
		} catch (error) {
			alert('JSON is not valid')
			addToast('JSON is not valid',"error")
		}
	}

	let open: boolean
	const closeModal = () => {
		open = false
	}
</script>

<Dialog.Root bind:open portal="yes">
	<Dialog.Trigger class={buttonVariants({ size: 'sm' })}>
		Upload JSON
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add JSON file</Dialog.Title>
		</Dialog.Header>
		<div class="flex flex-row flex-wrap gap-4">
			<InputFiles id="picture" bind:files={jsonFile} />
		</div>
		<div class="flex w-full items-center gap-6">
			<span class="w-full border border-slate-300" />
			<p class="text-xs text-slate-300">OR</p>
			<span class="w-full border border-slate-300" />
		</div>

		<Textarea
			on:input={handleSubmit}
			placeholder="Type your JSON here."
			name="jsonFile"
			class="w-full"
		/>

		<Button on:click={createDesignSystemFromJson}>Upload</Button>
	</Dialog.Content>
</Dialog.Root>
