<script lang="ts">
	import '../app.postcss'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import selectedTokensStore from '$lib/features/select-tokens/selectedTokensStore'
	import { navigating } from '$app/stores'
	import tokenBaseMainStore from '$lib/features/token-groups-store/tokenbaseMainStore'

	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('selectedTokensStore', selectedTokensStore)
	setContext('tokenBaseMainStore', tokenBaseMainStore)

	$: if ($navigating) selectedTokensStore.clearTokens()
</script>

<slot />
