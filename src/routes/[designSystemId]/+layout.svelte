<script lang="ts">
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
</script>

<main class="grid min-h-screen grid-cols-[250px_1fr] bg-gray-100">
	<TokenGroupsExplorer />
	<slot />
</main>
