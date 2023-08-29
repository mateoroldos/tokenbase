<script lang="ts">
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import ExportSheet from '$lib/components/ExportSheet.svelte'
	import { SquareEqual, Plus } from 'lucide-svelte'
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
	class="flex flex-1 flex-col justify-between gap-6 overflow-hidden border-r border-r-gray-100 bg-gray-50 px-5 py-4"
>
	<a href="/" class="text-lg font-medium">
		<SquareEqual class="mb-1 inline-block h-6 w-6" />
		Tokenbase
	</a>
	<div class="flex flex-1 flex-col gap-2 overflow-auto">
		{#if tree.children.length === 0}
			<p class="text-sm text-gray-400">
				Design System empty. Add a new group to start.
			</p>
		{/if}
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
		<button
			class="align-center font-small mt-3 flex flex-row items-center gap-1 border-t border-solid border-t-gray-200 pl-2 pt-1 text-sm text-gray-400 transition-colors hover:text-gray-500"
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
