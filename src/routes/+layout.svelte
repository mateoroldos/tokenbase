<script lang="ts">
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/groups'
	import selectedTokensStore from '$lib/features/select-tokens/selectedTokensStore'
	import { navigating } from '$app/stores'
	import designSystemsStore from '$lib/features/token-groups-store/designSystemsIds'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('selectedTokensStore', selectedTokensStore)
	setContext('tokenBaseMainStore', designSystemsStore)

	$: if ($navigating) selectedTokensStore.clearTokens()
</script>

<slot />
