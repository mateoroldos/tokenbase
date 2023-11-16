<script lang="ts">
	import '../app.postcss'
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/groups'
	import designSystemsStore from '$lib/features/token-groups-store/designSystemsIds'
	import previewDesignSystemsStore from '$lib/features/preview-template/designSyststems'
	import previewGroupsStore from '$lib/features/preview-template/previewGroups'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('tokenBaseMainStore', designSystemsStore)
	setContext('previewDesignTokensGroupStore', previewGroupsStore)
	setContext('previewTokenBaseMainStore', previewDesignSystemsStore)
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<slot />
</div>
