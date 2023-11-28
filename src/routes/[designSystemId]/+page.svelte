<script lang="ts">
	import EmptyDesignSystemPage from '$lib/components/empty-state-pages/EmptyDesignSystemPage.svelte'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)

	const activeDesignSystemId: Readable<string> = getContext(
		'activeDesignSystemId'
	)
</script>

<div class="h-full overflow-hidden">
	<EmptyDesignSystemPage
		activeDesignSystemThemes={$designSystemsOverviewsStore[
			$activeDesignSystemIndex
		]?.themes}
		groupIdToImportTemplate={$activeDesignSystemId}
	/>
</div>
