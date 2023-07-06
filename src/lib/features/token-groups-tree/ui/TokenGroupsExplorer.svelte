<script lang="ts">
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import ExportSheet from '$components/ExportSheet.svelte'
	import { Plus } from 'lucide-svelte'
	import groupsStore from '$lib/features/token-groups-store/groups'
	import { v4 as uuidv4 } from 'uuid'

	const handleAddNewGroup = () => {
		const id = uuidv4()

		groupsStore.addGroup('', id, $page.params.designSystemId)

		goto(`/${$page.params.designSystemId}/${id}`)
	}

	$: tree = createTree($groupsStore, $page.params.designSystemId ?? '')
</script>

<div
	class="flex flex-col justify-between border-r border-solid bg-gray-200 px-8 py-7"
>
	<div class="flex flex-col gap-3">
		<a href="/" class="text-lg font-bold">Tokenbase</a>
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
		<button
			class="align-center font-small flex flex-row items-center gap-1 border-t border-solid border-t-gray-300 pl-2 pt-1 text-sm text-gray-400 transition-colors hover:text-gray-500"
			on:click={handleAddNewGroup}
		>
			<Plus class="h-3 w-3" />
			Add group
		</button>
	</div>
	<div class="flex flex-col gap-3">
		<ExportSheet />
	</div>
</div>
