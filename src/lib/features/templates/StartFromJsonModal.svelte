<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import jsonSuite from '../token-management/jsonSuite'
	import InputWrapper from '$lib/components/InputWrapper.svelte'

	let json: string
	let desingSystemId: string
	let jsonFile: File

	function handleSubmit(event: Event) {
		const textarea = event.target as HTMLTextAreaElement
		json = textarea.value
		desingSystemId = $page.params.designSystemId as string
		res = jsonSuite(json, event.target.name)
	}

	let res = jsonSuite.get()

	const createDesignSystemFromJson = async () => {
		try {
			if (jsonFile) {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader()
					fileReader.readAsText(jsonFile[0])
					fileReader.onload = () => {
						const desingSystemId = $page.params.designSystemId as string
						importStyleDictionary(fileReader.result as string, desingSystemId)
					}
				})
			} else {
				importStyleDictionary(json, desingSystemId)
			}
		} catch (error) {
			alert('JSON is not valid')
		}
	}
</script>

<Dialog.Root>
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
		<InputWrapper
			name="jsonFile"
			errors={res.getErrors('jsonFile')}
			isValid={res.isValid('jsonFile')}
			errorIcon
		>
			<Textarea
				on:input={handleSubmit}
				placeholder="Type your JSON here."
				name="jsonFile"
			/>
		</InputWrapper>

		<Button on:click={createDesignSystemFromJson}>Upload</Button>
	</Dialog.Content>
</Dialog.Root>
