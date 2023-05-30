<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import buildStyleDictionaryJson from '$lib/features/convert-tokens/buildStyleDictonaryJson'
	import styleDictionaryBuild from '$lib/features/convert-tokens/styleDictionaryBuild'
	import { goto } from '$app/navigation'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'

	$: tree = createTree($designTokensGroupStore)
	$: groupId = $page.params.groupId as string

	const handleAddNewGroup = () => {
		designTokensGroupStore.addGroup('root', '')
		goto(`/${$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id}`)
	}
</script>

<div
	class="flex flex-col justify-between border-r border-solid border-gray-300 bg-gray-50 px-8 py-7"
>
	<div class="flex flex-col gap-3">
		<h1 class="text-lg font-bold">Tokenbase</h1>
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
	</div>
	<div class="flex flex-col gap-3">
		<button class="bg-blue-300 px-6" on:click={handleAddNewGroup}>add</button>
		<a
			class="flex flex-row items-center justify-center gap-2 rounded-md bg-black px-4 py-1 text-white"
			href={`/${groupId}/export`}
		>
			<Icon icon="tabler:package-export" />
			Export
		</a>
	</div>
</div>
