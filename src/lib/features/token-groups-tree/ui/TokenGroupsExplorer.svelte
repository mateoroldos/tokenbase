<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup';
	import GroupItem from './atoms/GroupItem.svelte';
	import createTree from '../functions/createTree';

	$: tree = createTree($designTokensGroupStore);
</script>

<div class="token-groups-explorer">
	{#each tree.children as node}
		<GroupItem {node} />
	{/each}
	<button on:click={() => designTokensGroupStore.addGroup('root', 'osss')}
		>add</button
	>
</div>

<style>
	.token-groups-explorer {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
