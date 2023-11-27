<script lang="ts">
	import GroupHeaderBreadcrumbs from '$lib/components/breadcrumbs/groups-header-breadcrumbs/GroupHeaderBreadcrumbs.svelte'
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Readable } from 'svelte/store'
	import type { PreviewStore } from '../../types/preview-store.type'
	import Button from '$lib/components/ui/button/Button.svelte'

	export let activeGroupIndex: number
	export let designSystemOverview: DesignSystemOverview
	export let groupsStore: Readable<Group[]>
	export let previewStore: PreviewStore

	const handleImportTemplate = () => {
		importStyleDictionary
	}
</script>

<div class="flex flex-row justify-between px-5 py-3">
	<GroupHeaderBreadcrumbs
		{activeGroupIndex}
		activeDesignSystemOverview={designSystemOverview}
		activeDesignSystemIndex={0}
		viewMode={true}
		{groupsStore}
		{previewStore}
	/>
	<div class="flex flex-row items-center gap-6">
		<slot />
		<Button size="sm">Import Template</Button>
	</div>
</div>
