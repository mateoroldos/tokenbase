<script lang="ts">
	import { goto } from '$app/navigation'
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '../../types/groups-tree'
	import { ChevronRight, Trash, Plus } from 'lucide-svelte'
	import { page } from '$app/stores'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import DropDown from '$lib/components/DropDown.svelte'

	export let node: GroupsTree

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	$: groupId = $page.params.groupId as string

	$: isActive = groupId === node.group.id

	let isOpen = false
	let hover = false

	const toggleOpen = () => {
		isOpen = !isOpen
	}

	const handleClick = (event: Event) => {
		event.stopPropagation()
		toggleOpen()
	}

	onMount(() => {
		if (node.children.length > 0) {
			isOpen = true
		}
	})

	const handleAddNewGroup = () => {
		designTokensGroupStore.addGroup('', undefined, node.group?.id)

		goto(
			`/${$page.params.designSystemId}/${
				$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id
			}`
		)
		toggleOpen()
	}

	const handleDeleteGroup = async () => {
		await goto(`/${$page.params.designSystemId}`)
		designTokensGroupStore.deleteGroup(node.group?.id)
		toggleOpen()
	}

	let customMenuItems = [
		{ title: 'Add a group', component: Plus, test: handleAddNewGroup },
		{ title: 'Delete a group', component: Trash, test: handleDeleteGroup }
	]
</script>

<div>
	<div
		class="flex flex-row items-center justify-between rounded-md p-1 text-gray-500 transition-all hover:bg-gray-100"
		on:mouseenter={() => {
			hover = true
		}}
		on:mouseleave={() => (hover = false)}
	>
		<div class="flex flex-row items-center gap-1">
			<div
				class="cursor-pointer transition-transform"
				class:rotate-90={isOpen}
				on:click={handleClick}
			>
				<ChevronRight class="h-3 w-3" />
			</div>
			<a
				class:text-black={isActive}
				href={`/${$page.params.designSystemId}/${node.group.id}`}
				class="text-sm font-medium">{node.group.name}</a
			>
			{#if node.group?.name === ''}
				<a
					href={`/${$page.params.designSystemId}/${node.group.id}`}
					class="text-sm font-medium text-black">Untitled</a
				>
			{/if}
		</div>
		{#if hover}
			<button
				class=" relative flex flex-row items-center bg-transparent text-sm text-gray-500"
			>
				<DropDown menuItems={customMenuItems} />
			</button>
		{/if}
	</div>
	{#if isOpen}
		<div class="pl-5">
			{#if node.children.length > 0}
				{#each node.children as childNode}
					<svelte:self node={childNode} />
				{/each}
			{:else}
				<span class="text-xs text-gray-500">Group has no children</span>
			{/if}
		</div>
	{/if}
</div>
