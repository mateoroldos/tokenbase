<script lang="ts">
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import DesignSystemBreadcrumb from './atoms/DesignSystemBreadcrumb.svelte'
	import GroupsBreadcrumbs from './atoms/GroupsBreadcrumbs.svelte'
	import type { Readable } from 'svelte/store'
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { PreviewStore } from '$lib/features/preview-template-modal/types/preview-store.type'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	export let activeGroupIndex: number
	export let activeDesignSystemIndex: number
	export let activeDesignSystemOverview: DesignSystemOverview
	export let groupsStore: GroupsStore | Readable<Group[]>
	export let previewStore: PreviewStore | null = null
	export let viewMode: boolean = false
</script>

<Breadcrumbs.Container>
	<DesignSystemBreadcrumb
		{activeDesignSystemIndex}
		{activeDesignSystemOverview}
		{viewMode}
		{designSystemsOverviewsStore}
	/>
	<GroupsBreadcrumbs
		lastItem={true}
		groupIndex={activeGroupIndex}
		{groupsStore}
		{previewStore}
		{viewMode}
	/>
</Breadcrumbs.Container>
