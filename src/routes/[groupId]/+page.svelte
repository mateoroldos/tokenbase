<script lang="ts">
	import type { Group } from '$lib/types/group-interface';
	import type { DesignTokensStore } from '$lib/stores/custom/tokensGroup';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import Token from '$lib/features/tokens/ui/Token.svelte';

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
	{#each $designTokensGroupStore[groupIndex].tokens as token}
		<Token bind:token />
	{/each}
	<button
		on:click={() =>
			designTokensGroupStore.addToken(groupId, 'osss', 'color', '#000000')}
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
