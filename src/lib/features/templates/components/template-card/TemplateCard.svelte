<script lang="ts">
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import * as Card from '$lib/components/ui/card'
	import { Box, Boxes } from 'lucide-svelte'
	import Badge from '$lib/components/ui/badge/badge.svelte'
	import PreviewTemplateModal from '$lib/features/preview-template-modal/components/PreviewTemplateModal.svelte'
	import styleDictionaryToGroups from '$lib/features/import-style-dictionary/functions/buildGroupsFromStyleDictionary'
	import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte'

	export let templateOverview: TemplateWithSlug

	const getTemplateGroups = async () => {
		const templateGroups = await fetch(
			`/api/templates/${templateOverview.slug}`
		).then((res) => res.json())

		const grupetes = styleDictionaryToGroups(
			templateGroups.template,
			templateOverview.slug,
			[
				{
					name: 'light',
					id: 'lai'
				}
			]
		)

		return grupetes
	}

	// const handleCreateGroupFromTemplate = async () => {
	// 	const templateFile = (
	// 		await fetch(`/api/templates/${templateOverview.slug}`).then((res) =>
	// 			res.json()
	// 		)
	// 	).template as string

	// 	let parentId = uuidv4()
	// }
</script>

{#await getTemplateGroups() then groups}
	<PreviewTemplateModal
		templateId={templateOverview.slug}
		{groups}
		themes={[
			{
				name: 'light',
				id: 'lai'
			}
		]}
	>
		<Card.Root
			class="flex h-full flex-1 flex-col items-start border-slate-300 bg-slate-50 text-left transition-colors hover:border-slate-900 hover:bg-slate-100"
		>
			<Card.Header>
				<Card.Title class="text-md flex flex-col gap-7 font-medium"
					>{templateOverview.name}</Card.Title
				>
				<Card.Description
					class="flex flex-row items-center gap-3 text-xs text-slate-800"
				>
					<div
						class="flex flex-row items-center rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
					>
						{#if templateOverview.type === 'group'}
							<Box class="mr-1 h-3 w-3" />
							<span>Group template</span>
						{:else}
							<Boxes class="mr-1 h-3 w-3" />
							<span>Design System Template</span>
						{/if}
					</div>
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm text-slate-500">
				{templateOverview.description}
			</Card.Content>
			<Card.Footer class="flex-1">
				<!-- <div class="flex h-full flex-col justify-end gap-3">
					<div class="flex flex-row flex-wrap gap-2">
						{#each templateOverview.tags as tag}
							<Badge variant="outline">
								{tag}
							</Badge>
						{/each}
					</div>
				</div> -->
				<UserAvatar name="Ape Falco" />
			</Card.Footer>
		</Card.Root>
	</PreviewTemplateModal>
{/await}
