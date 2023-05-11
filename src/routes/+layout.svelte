<script lang="ts">
	import '../app.css';
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte';
	import { setContext } from 'svelte';
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup';

	setContext('designTokensGroupStore', designTokensGroupStore);
</script>

<main>
	<TokenGroupsExplorer />
	<slot />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 5fr;
	}
</style>
