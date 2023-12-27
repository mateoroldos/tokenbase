<script lang="ts">
	import GroupHeaderBreadcrumbs from '$lib/components/breadcrumbs/design-system-header-breadcrumbs/DesignSystemHeaderBreadcrumbs.svelte'
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import GroupHeaderContainer from './atoms/GroupHeaderContainer.svelte'
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'

	export let activeDesignSystemIndex: number
	$: activeDesignSystem = $designSystemsOverviewsStore[
		activeDesignSystemIndex
	] as DesignSystemOverview
	export let activeWorkspaceId: string

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
</script>

<GroupHeaderContainer>
	<GroupHeaderBreadcrumbs
		activeGroupIndex={$activeGroupIndex}
		{activeDesignSystemIndex}
		activeDesignSystemOverview={activeDesignSystem}
		{groupsStore}
		viewMode={$viewMode}
		{activeWorkspaceId}
	/>
	<slot />
</GroupHeaderContainer>
