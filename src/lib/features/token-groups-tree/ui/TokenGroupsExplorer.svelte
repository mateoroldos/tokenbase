<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import buildStyleDictionaryJson from '$lib/features/convert-tokens/convertIntoJSON'

	$: tree = createTree($designTokensGroupStore)
</script>

<div
	class="flex flex-col gap-4 border-r border-solid border-gray-300 bg-gray-50 px-8 py-7"
>
	<h1 class="text-lg font-bold">Tokenbase</h1>
	{#each tree.children as node}
		<GroupItem {node} />
	{/each}
	<button
		class="bg-blue-300 px-6"
		on:click={() => designTokensGroupStore.addGroup('root', 'osss')}>add</button
	>
	<button
		class="bg-blue-300 px-6"
		on:click={() =>
			console.log(buildStyleDictionaryJson($designTokensGroupStore))}
		>Convert</button
	>
	<button
		class="bg-blue-300 px-6"
		on:click={() => console.log($designTokensGroupStore)}>See file</button
	>
</div>
