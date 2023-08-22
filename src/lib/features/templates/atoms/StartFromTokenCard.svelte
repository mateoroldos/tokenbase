<script lang="ts">
	import type { Template } from '$lib/features/templates/templates/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import { Button } from '$lib/components/ui/button'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { page } from '$app/stores'

	export let tokenTemplateOverview: Template

	const handleCreateSystemFromTemplate = async () => {
		const templateFile = await import(tokenTemplateOverview.path)

		const desingSystemId = $page.params.designSystemId as string

		importStyleDictionary(JSON.stringify(templateFile.default), desingSystemId)
	}
</script>

<Card.Root class="w-[250px]">
	<Card.Header>
		<Card.Title>{tokenTemplateOverview.name}</Card.Title>
		<Card.Description>Design System</Card.Description>
	</Card.Header>
	<Separator class="mb-3" />
	<Card.Content>
		<p>{tokenTemplateOverview.description}</p>
	</Card.Content>
	<Card.Footer>
		<Button on:click={handleCreateSystemFromTemplate}>Use token</Button>
	</Card.Footer>
</Card.Root>
