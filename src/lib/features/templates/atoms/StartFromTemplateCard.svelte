<script lang="ts">
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import importPreviewStyleDictionary from '$lib/features/preview-template/importPreviewStyleDictionary'
	import { Box, Boxes } from 'lucide-svelte'
	import * as Avatar from '$lib/components/ui/avatar'
	import Badge from '$lib/components/ui/badge/badge.svelte'
	import { preview } from '$lib/features/viewMode/stores/preview'
	import { viewMode } from '$lib/features/viewMode/stores/viewMode'

	import { v4 as uuidv4 } from 'uuid'
	import { designSystemId } from '$lib/features/preview-template/designSystemId'
	import PreviewTemplateModal from '$lib/features/preview-template/PreviewTemplateModal.svelte'

	import { createEventDispatcher, getContext } from 'svelte'
	import type { Readable } from 'svelte/store'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	export let templateOverview: TemplateWithSlug

	const activeDesignSystemThemesStore: Readable<Theme[]> = getContext(
		'activeDesignSystemThemesStore'
	)

	const dispatch = createEventDispatcher()

	const handleCreateGroupFromTemplate = async () => {
		const templateFile = (
			await fetch(`/api/templates/${templateOverview.slug}`).then((res) =>
				res.json()
			)
		).template as string

		let parentId = uuidv4()
		designSystemId.set(parentId)

		importPreviewStyleDictionary(JSON.stringify(templateFile), parentId)
		preview.set(true)
		viewMode.set(true)
	}

	function closeModal() {
		dispatch('load-template', templateOverview)
	}
</script>

<div class="h-full cursor-pointer" on:click={handleCreateGroupFromTemplate}>
	<Card.Root class="flex h-full  flex-1 flex-col">
		<Card.Header>
			<Card.Title class="text-md font-medium"
				>{templateOverview.name}</Card.Title
			>
			<Card.Description
				class="flex flex-row items-center text-xs leading-[0] text-slate-400"
			>
				{#if templateOverview.type === 'group'}
					<Box class="mr-1 h-3 w-3" />
					<span>Group template</span>
				{:else}
					<Boxes class="mr-1 h-3 w-3" />
					<span>Design System Template</span>
				{/if}
			</Card.Description>
		</Card.Header>
		<Separator class="mb-3" />
		<Card.Content class="text-sm">
			{templateOverview.description}
		</Card.Content>
		<Card.Footer class="flex-1">
			<div class="flex h-full flex-col justify-end gap-3">
				<div class="flex flex-row flex-wrap gap-2">
					{#each templateOverview.tags as tag}
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
			<PreviewTemplateModal
				{templateOverview}
				on:click={handleCreateGroupFromTemplate}
				on:load-template={closeModal}
			/>
		</Card.Footer>
	</Card.Root>
</div>
