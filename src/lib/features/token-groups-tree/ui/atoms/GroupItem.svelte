<script lang="ts">
	import { goto } from '$app/navigation'
	import tokenBaseMainStore from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '../../types/groups-tree'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { ChevronRight } from 'lucide-svelte'
	import { page } from '$app/stores'

	export let node: GroupsTree

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
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

	const handleAddNewGroup = () => {
		designTokensGroupStore.addGroup('', undefined, node.group.id)

		goto(
			`/${$page.params.designSystemId}/${
				$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id
			}`
		)
	}

	onMount(() => {
		if (node.children.length > 0) {
			isOpen = true
		}
	})
</script>

<div>
	<div
		class="flex flex-row items-center justify-between rounded-md p-1 text-gray-500 transition-all hover:bg-gray-200"
		on:mouseenter={() => {
			hover = true
		}}
		on:mouseleave={() => (hover = false)}
	>
		<div class=" flex flex-row items-center gap-1">
			<div
				class="cursor-pointer transition-transform"
				class:rotate-90={isOpen}
				on:click={handleClick}
			>
				<ChevronRight class="h-4 w-4" />
			</div>
			<a
				class:text-black={isActive}
				href={`/${$page.params.designSystemId}/${node.group.id}`}
				>{node.group.name}</a
			>
		</div>

		{#if hover}
			<button class="bg-transparent text-gray-500" on:click={handleAddNewGroup}>
				+
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
