<script lang="ts">
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import Token from '$lib/features/token-ui/ui/Token.svelte';
	import tokenTypesArray from '$lib/utils/tokenTypesArray';

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	);

	$: groupId = $page.params.groupId as string;
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number;

	const handleDelete = async () => {
		await goto('/');
		designTokensGroupStore.deleteGroup(groupId);
	};
</script>

<div>
	<div class="bg-red-300 flex">
		<div class="flex bg-red-300" />
		<div class="px-4 bg-red-300 flex" />
		<div class="bg-red-50 flex-1 grayscale-0" />
		<div />
		<h1
			contenteditable="true"
			bind:textContent={$designTokensGroupStore[groupIndex].name}
		/>
		<select bind:value={$designTokensGroupStore[groupIndex].type}>
			{#each tokenTypesArray as contentType}
				<option value={contentType}>
					{contentType}
				</option>
			{/each}
		</select>
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
