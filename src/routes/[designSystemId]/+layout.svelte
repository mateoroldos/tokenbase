<script lang="ts">
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)
</script>

{#if activeDesignSystemIndex >= 0}
	<main class="grid min-h-screen grid-cols-[250px_1fr] bg-gray-50">
		<TokenGroupsExplorer />
		<slot />
	</main>
{:else}
	<div>Design system not found</div>
{/if}
