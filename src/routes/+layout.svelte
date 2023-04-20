<script lang="ts">
	import '../app.scss';
	import type { LayoutData } from './$types';
	import { trpc } from '$lib/trpc';
	import TokenGroupsExplorer from '$lib/features/token-groups-explorer/ui/TokenGroupsExplorer.svelte';
	import { setContext } from 'svelte';
	import designTokensGroupStore from '$lib/stores/custom/tokensGroup';

	export let data: LayoutData;

	setContext('designTokensGroupStore', designTokensGroupStore);

	const queryClient = trpc.hydrateQueryClient(data.trpc);
</script>

<queryclientprovider client={queryClient}>
	<main>
		<TokenGroupsExplorer />
		<slot />
	</main>
</queryclientprovider>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 5fr;
	}
</style>
