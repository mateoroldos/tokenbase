<script lang="ts">
	import '../app.postcss'
	import '../app.postcss'
	// import { setContext } from 'svelte'
	// import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	// import previewDesignSystemsStore from '$lib/features/preview-template/designSyststems'
	// import previewGroupsStore from '$lib/features/preview-template/previewGroups'
	// import groupsStore from '$lib/features/token-groups-store/groupsStore'

	// setContext('designSystemsOverviewsStore', designSystemsOverviewsStore)
	// setContext('groupsStore', groupsStore)
	// setContext('previewDesignTokensGroupStore', previewGroupsStore)
	// setContext('previewTokenBaseMainStore', previewDesignSystemsStore)
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<slot />
</div>
