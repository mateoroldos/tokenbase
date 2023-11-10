<script lang="ts">
	import Logo from '$lib/components/Logo.svelte'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import ExportSheet from '$lib/components/ExportSheet.svelte'
	import { Plus } from 'lucide-svelte'
	import groupsStore from '$lib/features/token-groups-store/groups'
	import { v4 as uuidv4 } from 'uuid'
	import { Separator } from '$lib/components/ui/separator'
	import { viewMode } from '$lib/features/viewMode/stores/viewMode'
	
	const handleAddNewGroup = () => {
		const id = uuidv4()

		groupsStore.addGroup('', id, $page.params.designSystemId)

		goto(`/${$page.params.designSystemId}/${id}`)
	}

	$: tree = createTree($groupsStore, $page.params.designSystemId ?? '')
</script>

<div
	class="border-red flex h-screen flex-1 flex-col justify-between gap-6 overflow-hidden border-r border-r-slate-100 bg-slate-50 px-5 py-4"
>
	<Logo />
	<div class="flex flex-1 flex-col gap-2 overflow-auto">
		{#if tree.children.length === 0}
			<p class="text-sm text-slate-300">Add a new group to start.</p>
		{/if}
		{#each tree.children as node, i (node.group.id)}
			<GroupItem {node} />
		{/each}
		<Separator
			class="mt-4 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
		/>
		{#if !$viewMode}
			<button
				class="align-center font-small flex flex-row items-center gap-1 pl-1 text-sm text-slate-400 transition-colors hover:text-slate-500"
				on:click={handleAddNewGroup}
			>
				<Plus class="h-3 w-3" />
				New group
			</button>
		{/if}
	</div>
	<div class="flex flex-col gap-3">
		<ExportSheet />
	</div>
</div>
