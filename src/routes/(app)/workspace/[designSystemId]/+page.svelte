<script lang="ts">
	import EmptyDesignSystemPage from '$lib/components/empty-state-pages/EmptyDesignSystemPage.svelte'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'
	import DesignSystemHeader from './_components/design-system-header/DesignSystemHeader.svelte'

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)

	const activeDesignSystemId: Readable<string> = getContext(
		'activeDesignSystemId'
	)
</script>

<DesignSystemHeader activeDesignSystemIndex={$activeDesignSystemIndex} />
<EmptyDesignSystemPage
	activeDesignSystemThemes={$designSystemsOverviewsStore[
		$activeDesignSystemIndex
	]?.themes}
	designSystemId={$activeDesignSystemId}
/>
