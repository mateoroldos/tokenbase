<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { GroupsTree } from '../../types/groups-tree';
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup';

	export let node: GroupsTree;

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	);

	let isOpen = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	const handleClick = (event: Event) => {
		event.stopPropagation();
		toggleOpen();
	};

	onMount(() => {
		if (node.children.length > 0) {
			isOpen = true;
		}
	});
</script>

<div class="group-item" class:has-subgroups={node.children.length > 0}>
	<div class="group-name">
		<span class="arrow-icon" on:click={handleClick}
			>{#if node.children.length > 0}{isOpen ? '▼' : '►'}{/if}</span
		>
		<a href={`/${node.group.id}`}>{node.group.name}</a>
		<button
			on:click={() => designTokensGroupStore.addGroup(node.group.id, 'aaa')}
		>
			+
		</button>
	</div>
	{#if isOpen}
		<div class="subgroups">
			{#each node.children as childNode}
				<svelte:self node={childNode} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.group-item {
		padding: 4px 8px;
		cursor: pointer;

		&:hover {
			background-color: #f0f0f0;
		}

		.group-name {
			display: flex;
			align-items: center;
			gap: 1rem;

			.arrow-icon {
				margin-right: 4px;
				font-size: 10px;
			}
		}

		.subgroups {
			margin-left: 16px;
		}

		&.has-subgroups {
			.group-name {
				font-weight: bold;
			}
		}
	}
</style>
