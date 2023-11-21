<script lang="ts">
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import { getContext } from 'svelte'
	import DesignSystemBreadcrumb from './atoms/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumbs from './atoms/GroupBreadcrumbs.svelte'
	import type { Readable } from 'svelte/store'

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)
</script>

<Breadcrumbs.Container>
	<DesignSystemBreadcrumb activeDesignSystemIndex={$activeDesignSystemIndex} />
	<GroupBreadcrumbs lastItem={true} groupIndex={$activeGroupIndex} />
</Breadcrumbs.Container>
