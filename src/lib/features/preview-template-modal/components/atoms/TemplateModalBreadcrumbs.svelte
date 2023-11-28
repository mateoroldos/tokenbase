<script lang="ts">
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import type { Readable } from 'svelte/store'
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { PreviewStore } from '$lib/features/preview-template-modal/types/preview-store.type'
	import GroupsBreadcrumbs from '$lib/components/breadcrumbs/groups-header-breadcrumbs/atoms/GroupsBreadcrumbs.svelte'

	export let activeGroupIndex: number
	export let groupsStore: GroupsStore | Readable<Group[]>
	export let previewStore: PreviewStore | null = null
	export let viewMode: boolean = false
	export let templateName: string
</script>

<Breadcrumbs.Container>
	<Breadcrumbs.Container>
		<Breadcrumbs.Element name={templateName} noLink={true} />
	</Breadcrumbs.Container>
	<GroupsBreadcrumbs
		noLink={true}
		groupIndex={activeGroupIndex}
		{groupsStore}
		{previewStore}
		{viewMode}
	/>
</Breadcrumbs.Container>
