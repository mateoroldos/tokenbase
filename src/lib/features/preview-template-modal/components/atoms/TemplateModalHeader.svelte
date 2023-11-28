<script lang="ts">
	import TemplateModalBreadcrumbs from './TemplateModalBreadcrumbs.svelte'
	import type {
		DesignSystemOverview,
		Theme
	} from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Readable } from 'svelte/store'
	import type { PreviewStore } from '../../types/preview-store.type'
	import Button from '$lib/components/ui/button/Button.svelte'
	import {
		importGroups,
		importTokens
	} from '$lib/features/import-style-dictionary/importGroups'
	import { createEventDispatcher } from 'svelte'

	export let activeGroupIndex: number
	export let designSystemOverview: DesignSystemOverview
	export let groupsStore: Readable<Group[]>
	export let previewStore: PreviewStore
	export let groupIdToImportTemplate: string
	export let activeDesignSystemThemes: Theme[]
	export let isDesignSystemRoot: boolean

	const dispatch = createEventDispatcher()

	const handleImportTemplate = () => {
		if ($previewStore.templateType === 'groups') {
			importGroups(
				$groupsStore,
				designSystemOverview.id,
				groupIdToImportTemplate,
				activeDesignSystemThemes,
				isDesignSystemRoot
			)

			dispatch('importedTemplate')
		} else if ($previewStore.templateType === 'tokens') {
			if ($groupsStore[0] && $groupsStore[0].tokens) {
				importTokens(
					$groupsStore[0],
					groupIdToImportTemplate,
					activeDesignSystemThemes,
					isDesignSystemRoot
				)
			}

			dispatch('importedTemplate')
		}
	}
</script>

<div class="flex flex-row justify-between px-5 py-3">
	<TemplateModalBreadcrumbs
		templateName={designSystemOverview.name}
		{activeGroupIndex}
		viewMode={true}
		{groupsStore}
		{previewStore}
	/>
	<div class="flex flex-row items-center gap-6">
		<slot />
		<Button
			size="sm"
			on:click={handleImportTemplate}
			disabled={!groupIdToImportTemplate}>Import Template</Button
		>
	</div>
</div>
