<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import InputFiles from '$lib/components/ui/input/InputFiles.svelte'
	import { getContext } from 'svelte'
	import type { Theme } from '../../../token-groups-store/types/design-system-overview.interface'
	import styleDictionaryToGroups from '$lib/features/import-style-dictionary/functions/buildGroupsFromStyleDictionary'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { importGroups } from '$lib/features/import-style-dictionary/importGroups'
	import { v4 as uuidv4 } from 'uuid'
	import * as Tabs from '$lib/components/ui/tabs'
	import * as Card from '$lib/components/ui/card'
	import Label from '$lib/components/ui/label/Label.svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Readable } from 'svelte/store'
	import readJsonFile from '$lib/utils/readJsonFile'
	import { File as IFile, Text } from 'lucide-svelte'
	import ItemCountCard from './atoms/ItemCountCard.svelte'
	import ErrorMessage from './atoms/ErrorMessage.svelte'

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)

	$: themes = $designSystemsOverviewsStore[$activeDesignSystemIndex]
		?.themes as Theme[]

	$: desingSystemId = $page.params.designSystemId as string

	let jsonString = ''
	let jsonFile: FileList

	$: fileJsonStringPromise =
		jsonFile && jsonFile[0]
			? readJsonFile(jsonFile[0] as File)
			: new Promise<string>((resolve) => resolve(''))

	$: activeJsonStringPromise =
		activeTab === 'file'
			? fileJsonStringPromise
			: new Promise<string>((resolve) => resolve(jsonString))

	let activeTab: 'file' | 'input' = 'file'

	const uuid = uuidv4()

	let groupsToImport: Group[] = []

	let getGroupsToImport = async (activeJson: Promise<string>) => {
		try {
			const jsonStr = await activeJson

			const groups = styleDictionaryToGroups(
				JSON.parse(jsonStr),
				uuid,
				themes
			) as Group[]

			if (groups) {
				groupsToImport = groups
			} else {
				groupsToImport = []
			}
		} catch (error) {
			groupsToImport = []
		}
	}

	$: getGroupsToImport(activeJsonStringPromise)

	const handleImportTemplate = async () => {
		let activeGroup = $page.params.groupId

		let parentId = activeGroup ? activeGroup : desingSystemId

		try {
			if (groupsToImport && groupsToImport.length > 0) {
				importGroups(groupsToImport, uuid, parentId, themes, true)
			}

			open = false
		} catch (error) {
			alert('JSON is not valid')
		}
	}

	$: numberOfGroupsToImport = groupsToImport.length
	$: numberOfTokensToImport = groupsToImport.flatMap(
		(group) => group.tokens
	).length

	let open: boolean
</script>

<Dialog.Root bind:open portal="yes">
	<div on:click={() => (open = true)} class="h-full"><slot /></div>
	<Dialog.Content
		class="min-w-[35vw] min-h-[70vh] gap-5 flex flex-col p-7 justify-between"
		showClose={false}
	>
		<div class="flex flex-col gap-4">
			<Dialog.Header>
				<Dialog.Title>JSON Importer</Dialog.Title>
				<Dialog.Description>
					Please upload a JSON file or paste a JSON string to import.
				</Dialog.Description>
			</Dialog.Header>
			<Tabs.Root bind:value={activeTab}>
				<Tabs.List class="w-full">
					<Tabs.Trigger value="file" class="w-full gap-1">
						<IFile class="w-3" />
						File
					</Tabs.Trigger>
					<Tabs.Trigger value="input" class="w-full gap-1">
						<Text class="w-3" />
						Input
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="file">
					<Card.Root class="flex-1">
						<Card.Header>
							<Card.Title>Upload a JSON file</Card.Title>
							<Card.Description
								>Upload a style dictionary compatible JSON file.</Card.Description
							>
						</Card.Header>
						<Card.Content>
							<Label for="json-file">JSON File</Label>
							<InputFiles
								id="json-file"
								name="json-file"
								bind:files={jsonFile}
								accept="application/JSON"
							/>
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="input">
					<Card.Root>
						<Card.Header>
							<Card.Title>Insert your JSON</Card.Title>
							<Card.Description
								>Insert a style dictionary compatible JSON string.</Card.Description
							>
						</Card.Header>
						<Card.Content>
							<Label for="json-string">JSON string</Label>
							<Textarea
								bind:value={jsonString}
								placeholder="Type your JSON here."
								name="json-string"
								rows={6}
							/>
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
			</Tabs.Root>
		</div>
		<div class="flex flex-col gap-3">
			{#if groupsToImport.length > 0}
				<div class="grid grid-cols-2 gap-3">
					<ItemCountCard
						title="Groups to import"
						number={numberOfGroupsToImport}
					/>
					<ItemCountCard
						title="Tokens to import"
						number={numberOfTokensToImport}
					/>
				</div>
			{:else if activeTab === 'file'}
				{#if jsonFile && jsonFile[0]}
					<ErrorMessage message="Upsss.. the file you uploaded is invalid" />
				{/if}
			{:else if activeTab === 'input'}
				{#if jsonString}
					<ErrorMessage message="Upsss.. the text is an invalid JSON" />
				{/if}
			{/if}
			<Button
				on:click={handleImportTemplate}
				disabled={groupsToImport.length === 0}>Upload</Button
			>
		</div>
		<Dialog.Close class="right-3 top-3" />
	</Dialog.Content>
</Dialog.Root>
