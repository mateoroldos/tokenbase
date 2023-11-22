<script lang="ts">
	import Logo from '$lib/components/Logo.svelte'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import ExportSheet from '$lib/components/ExportSheet.svelte'
	import { Plus } from 'lucide-svelte'
	import { v4 as uuidv4 } from 'uuid'
	import { Separator } from '$lib/components/ui/separator'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import type { Writable } from 'svelte/store'

	export let groups: Group[]
	export let designSystemId: string
	export let previewStore: null | Writable<{
		activeGroupId: string
	}> = null
	export let viewMode = false

	const handleAddNewGroup = () => {
		const id = uuidv4()

		groupsStore.addGroup('', id, designSystemId)

		goto(`/${designSystemId}/${id}`)
	}

	$: tree = createTree(groups, designSystemId)
</script>

<div
	class="border-red flex h-screen flex-1 flex-col justify-between gap-6 overflow-hidden border-r border-r-slate-100 bg-slate-50 px-5 py-4"
>
	<Logo />
	<div class="flex flex-1 flex-col gap-2 overflow-auto">
		{#if tree.children.length === 0}
			<p class="text-sm text-slate-300">Add a new group to start.</p>
		{/if}
		{#each tree.children as node, i (node.group?.id)}
			<GroupItem {node} {previewStore} {viewMode} />
		{/each}
		<Separator
			class="mt-4 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
		/>
		{#if !viewMode || !$previewStore}
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
