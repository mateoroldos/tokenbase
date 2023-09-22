<script lang="ts">
	import type { Template } from '$lib/features/templates/types/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import { Button } from '$lib/components/ui/button'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { page } from '$app/stores'
	import { Braces } from 'lucide-svelte'
	import Badge from '$lib/components/ui/badge/badge.svelte'
	import { goto } from '$app/navigation'

	export let tokenTemplateOverview: Template

	const handleCreateSystemFromTemplate = async () => {
		const templateFile = await import(tokenTemplateOverview.path)

		const desingSystemId = $page.params.designSystemId as string

		importStyleDictionary(JSON.stringify(templateFile.default), desingSystemId)
	}
</script>

<div class="h-full cursor-pointer" on:click={handleCreateSystemFromTemplate}>
	<Card.Root class="flex h-full  flex-1 flex-col">
		<Card.Header>
			<Card.Title class="text-md font-medium"
				>{tokenTemplateOverview.name}</Card.Title
			>
			<Card.Description
				class="flex flex-row items-center text-xs leading-[0] text-slate-400"
				><Braces class="mr-1 h-3 w-3" /><span>Token template</span
				></Card.Description
			>
		</Card.Header>
		<Separator class="mb-3" />
		<Card.Content class="text-sm">
			<p>{tokenTemplateOverview.description}</p>
		</Card.Content>
		<Card.Footer class="flex-1">
			<div class="flex flex-row flex-wrap gap-2">
				{#each tokenTemplateOverview.tags as tag}
					<Badge variant="outline">
						{tag}
					</Badge>
				{/each}
			</div>
		</Card.Footer>
	</Card.Root>
</div>
