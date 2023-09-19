<script lang="ts">
	import type { Template } from '$lib/features/templates/types/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { page } from '$app/stores'
	import { Box, Boxes } from 'lucide-svelte'
	import * as Avatar from '$lib/components/ui/avatar'
	import Badge from '$lib/components/ui/badge/badge.svelte'

	export let tokenTemplateOverview: Template

	const handleCreateSystemFromTemplate = async () => {
		const templateFile = await import(tokenTemplateOverview.path)

		const desingSystemId = $page.params.designSystemId as string

		importStyleDictionary(JSON.stringify(templateFile.default), desingSystemId)
	}
</script>

<div class="h-full cursor-pointer" on:click={handleCreateSystemFromTemplate}>
	<Card.Root class="w-[250px]">
		<Card.Header>
			<Card.Title class="text-md font-medium"
				>{tokenTemplateOverview.name}</Card.Title
			>
			<Card.Description
				class="flex flex-row items-center text-xs leading-[0] text-slate-400"
				>{#if tokenTemplateOverview.type === 'token'}
					<Box class="mr-1 h-3 w-3" />
					<span>Token template</span>
				{:else}
					<Boxes class="mr-1 h-3 w-3" />
					<span>Design system template</span>
				{/if}</Card.Description
			>
		</Card.Header>
		<Separator class="mb-3" />
		<Card.Content>
			<p>{tokenTemplateOverview.description}</p>
		</Card.Content>
		<Card.Footer class="flex-1">
			<div class="flex h-full flex-col justify-end gap-3">
				<div class="flex flex-row flex-wrap gap-2">
					{#each tokenTemplateOverview.tags as tag}
						<Badge variant="outline">
							{tag}
						</Badge>
					{/each}
				</div>
				<div
					class="flex w-fit flex-row items-center gap-1 rounded-full bg-slate-100 p-1 pr-2"
				>
					<Avatar.Root class="h-5 w-5">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<span class="text-xs font-medium text-slate-600">Ape Falco</span>
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
