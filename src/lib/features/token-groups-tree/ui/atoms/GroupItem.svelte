<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '../../types/groups-tree'
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup'

	export let node: GroupsTree

	const designTokensGroupStore: DesignTokensStore =
		getContext('designTokensGroupStore')

	let isOpen = false

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
</script>

<div
	class="group-item"
	class:has-subgroups={node.children.length > 0}
>
	<div class="flex flex-row items-center gap-2">
		{#if node.children.length > 0}
			<span
				class="cursor-pointer text-xs text-gray-400"
				on:click={handleClick}
			>
				{isOpen ? '▼' : '►'}
			</span>
		{:else}
			<span class="text-xs text-gray-300">○</span>
		{/if}
		<a href={`/${node.group.id}`}>{node.group.name}</a>
		<button
			on:click={() =>
				designTokensGroupStore.addGroup(
					node.group.id,
					'aaa'
				)}
		>
			+
		</button>
	</div>
	{#if isOpen}
		<div class="ml-7">
			{#each node.children as childNode}
				<svelte:self node={childNode} />
			{/each}
		</div>
	{/if}
</div>
