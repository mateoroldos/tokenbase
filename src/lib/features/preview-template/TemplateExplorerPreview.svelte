<script lang="ts">
	import Logo from '$lib/components/Logo.svelte'
    import GroupItem from './GroupItem.svelte'
	import createTree from '$lib/features/token-groups-tree/functions/createTree'
    import previewGroupsStore from './previewGroups'
	import { Separator } from '$lib/components/ui/separator'
	import { designSystemId } from './designSystemId'

	$: tree = createTree($previewGroupsStore, $designSystemId)
	
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
			<GroupItem {node}/>
		{/each}
		<Separator
			class="mt-4 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
		/>
	</div>
</div>
