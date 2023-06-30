<script lang="ts">
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.designSystems.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)
</script>

{#if activeDesignSystemIndex >= 0}
	<main class="grid min-h-screen grid-cols-[250px_1fr] bg-gray-100">
		<TokenGroupsExplorer />
		<slot />
	</main>
{:else}
	<div>Design system not found</div>
{/if}
