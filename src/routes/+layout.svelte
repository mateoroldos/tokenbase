<script lang="ts">
	import '../app.css'
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import { setContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import selectedTokensStore from '$lib/features/select-tokens/selectedTokensStore'
	import { navigating } from '$app/stores'
	import tokenBaseMainStore from '$lib/features/token-groups-store/tokenbase-main-store'
	setContext('designTokensGroupStore', designTokensGroupStore)
	setContext('selectedTokensStore', selectedTokensStore)
	setContext('tokenBaseMainStore', tokenBaseMainStore)

	$: if ($navigating) selectedTokensStore.clearTokens()
</script>

<main class="grid min-h-screen grid-cols-[250px_1fr]">
	<TokenGroupsExplorer />
	<slot />
</main>
