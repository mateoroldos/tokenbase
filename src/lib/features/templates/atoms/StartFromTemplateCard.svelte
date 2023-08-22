<script lang="ts">
	import type { Template } from '$lib/features/templates/templates/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import { Button } from '$lib/components/ui/button'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { page } from '$app/stores'

	export let templateOverview: Template
	export let isGroupTemplate = false

	const handleCreateGroupFromTemplate = async () => {
		const templateFile = await import(templateOverview.path)

		let parentId: string

		if (isGroupTemplate) {
			parentId = $page.params.groupId as string
		} else {
			parentId = $page.params.designSystemId as string
		}

		importStyleDictionary(JSON.stringify(templateFile.default), parentId)
	}
</script>

<Card.Root class="w-[250px]">
	<Card.Header>
		<Card.Title>{templateOverview.name}</Card.Title>
		<Card.Description>Group template</Card.Description>
	</Card.Header>
	<Separator class="mb-3" />
	<Card.Content>
		<p>{templateOverview.description}</p>
	</Card.Content>
	<Card.Footer>
		<Button on:click={handleCreateGroupFromTemplate}>Use template</Button>
	</Card.Footer>
</Card.Root>
