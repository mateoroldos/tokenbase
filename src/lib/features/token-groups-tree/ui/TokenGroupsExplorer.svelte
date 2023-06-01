<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import buildStyleDictionaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'
	import styleDictionaryBuild, {
		STYLE_DICTIONARY_CONFIG
	} from '$lib/features/export-design-system/styleDictionaryBuild'
	import { goto } from '$app/navigation'

	$: tree = createTree($designTokensGroupStore)

	const handleAddNewGroup = () => {
		designTokensGroupStore.addGroup('root', '')
		goto(`/${$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id}`)
	}
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
		on:click={() =>
			console.log(buildStyleDictionaryJson($designTokensGroupStore))}
		>Convert</button
	>
	<button
		class="bg-blue-300 px-6"
		on:click={() => console.log($designTokensGroupStore)}>See file</button
	>
	<button
		class="bg-blue-300 px-6"
		on:click={() =>
			styleDictionaryBuild(
				buildStyleDictionaryJson($designTokensGroupStore),
				STYLE_DICTIONARY_CONFIG,
				'/tokens.json'
			)}>Create file</button
	>
	<button class="bg-blue-300 px-6" on:click={handleAddNewGroup}>add</button>
</div>
