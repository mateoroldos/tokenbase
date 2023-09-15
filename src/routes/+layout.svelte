<script lang="ts">
	import '../app.postcss'
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/groups'
	import designSystemsStore from '$lib/features/token-groups-store/designSystemsIds'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('tokenBaseMainStore', designSystemsStore)
</script>

<div class="flex min-h-screen flex-col">
	<slot />
</div>
