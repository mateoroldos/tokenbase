<script lang="ts">
	import { buttonVariants } from '$components/ui/button'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import { Textarea } from '$components/ui/textarea'
	import Button from '$components/ui/button/Button.svelte'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import InputFiles from '$components/ui/input/InputFiles.svelte'
	import InputWrapper from '$components/InputWrapper.svelte'
	import jsonSuite from '../token-management/jsonSuite'

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

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Upload your file
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add JSON file</DialogTitle>
		</DialogHeader>
		<div class="flex flex-row flex-wrap gap-4">
			<InputFiles id="picture" bind:files={jsonFile} />
		</div>
		<div class="flex w-full items-center gap-6">
			<span class="w-full border border-gray-300" />
			<p class="text-xs text-zinc-300">OR</p>
			<span class="w-full border border-gray-300" />
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
	</DialogContent>
</Dialog>
