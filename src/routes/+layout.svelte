<script lang="ts">
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/groups'
	import designSystemsStore from '$lib/features/token-groups-store/designSystemsIds'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('tokenBaseMainStore', designSystemsStore)
</script>

<div class="h-screen flex">
	<slot />
</div>
