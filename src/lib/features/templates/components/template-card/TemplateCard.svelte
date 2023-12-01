<script lang="ts">
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import * as Card from '$lib/components/ui/card'
	import PreviewTemplateModal from '$lib/features/preview-template-modal/components/PreviewTemplateModal.svelte'
	import styleDictionaryToGroups from '$lib/features/import-style-dictionary/functions/buildGroupsFromStyleDictionary'
	import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte'
	import TEMPLATE_DEFAULT_THEME from '../../constants/TEMPLATE_DEFAULT_THEME'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import TemplateLabel from '../template-type-label/TemplateLabel.svelte'
	import { createEventDispatcher } from 'svelte'

	export let templateOverview: TemplateWithSlug
	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let isDesignSystemRoot = false

	const dispatch = createEventDispatcher()

	const getTemplateGroups = async () => {
		const templateGroups = await fetch(
			`/api/templates/${templateOverview.slug}`
		).then((res) => res.json())

		const groups = styleDictionaryToGroups(
			templateGroups.template,
			templateOverview.slug,
			[TEMPLATE_DEFAULT_THEME]
		)

		return groups
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
		{templateOverview}
		{groups}
		{activeDesignSystemThemes}
		{groupIdToImportTemplate}
		{isDesignSystemRoot}
		on:importedTemplate={() => dispatch('importedTemplate')}
	>
		<Card.Root
			class="flex h-full flex-1 flex-col items-start border-slate-300 bg-slate-50 text-left transition-colors hover:border-slate-900 hover:bg-slate-100"
		>
			<Card.Header>
				<Card.Title class="text-md flex flex-col gap-7 font-medium"
					>{templateOverview.name}</Card.Title
				>
				<Card.Description>
					<TemplateLabel templateType={templateOverview.type} />
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
