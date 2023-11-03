<script lang="ts">
	import '../app.postcss'
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/groupsStore'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('tokenBaseMainStore', designSystemsOverviewsStore)
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<slot />
</div>
