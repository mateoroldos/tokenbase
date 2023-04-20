<script lang="ts">
	import type { Group } from '$lib/types/group-interface';
	import type { DesignTokensStore } from '$lib/stores/custom/tokensGroup';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	);

	$: groupId = $page.params.groupId as string;
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number;
	$: group = $designTokensGroupStore[groupIndex] as Group;

	const handleDelete = async () => {
		await goto('/');
		designTokensGroupStore.deleteGroup(groupId);
	};
</script>

<div>
	<div class="title-wrapper">
		<h1
			contenteditable="true"
			bind:textContent={$designTokensGroupStore[groupIndex].name}
		/>
		<button on:click={handleDelete}>delete</button>
	</div>
	{#each group.tokens as token}
		<div>{token.name}</div>
	{/each}
	<button
		on:click={() => designTokensGroupStore.addToken(groupId, 'osss', 'aa')}
		>Add token</button
	>
</div>

<style lang="scss">
	.title-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
