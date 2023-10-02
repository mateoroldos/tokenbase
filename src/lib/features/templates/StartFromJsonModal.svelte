<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import jsonSuite from '../token-management/jsonSuite'
	import InputFiles from '$lib/components/ui/input/InputFiles.svelte'
	import { createEventDispatcher } from 'svelte'

	let json: string
	let desingSystemId: string
	let jsonFile: File

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
						console.log('hola')
						importStyleDictionary(fileReader.result as string, desingSystemId)
						dispatch('load-template', jsonFile)
						console.log('hola')
						closeModal()
					}
				})
			} else {
				importStyleDictionary(json, desingSystemId)
				dispatch('load-template', jsonFile)
				console.log('hola 2')
				closeModal()
			}
		} catch (error) {
			alert('JSON is not valid')
		}
	}

	let open: boolean
	const closeModal = () => {
		open = false
	}
</script>

<Dialog.Root bind:open portal="yes">
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		Upload your file
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
