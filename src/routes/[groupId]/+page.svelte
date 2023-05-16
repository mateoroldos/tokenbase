<script lang="ts">
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	)

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number

	const handleDelete = async () => {
		await goto('/')
		designTokensGroupStore.deleteGroup(groupId)
	}
</script>

<div>
	<div
		class="border-b-1 flex flex-row gap-20 border-b border-solid border-gray-300 bg-gray-100 px-8 py-3"
	>
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
		<button on:click={() => designTokensGroupStore.addToken(groupId, 'color')}
			>Add token</button
		>
		<button on:click={handleDelete}>delete</button>
	</div>
	{#each $designTokensGroupStore[groupIndex].tokens as token}
		<Token bind:token />
	{/each}
</div>
