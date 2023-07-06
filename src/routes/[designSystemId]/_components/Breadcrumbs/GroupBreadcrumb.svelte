<script lang="ts">
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import Input from '$components/ui/input/Input.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	export let groupId: string
	export let lastItem = true

	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	$: parentGroupId = $designTokensGroupStore.find(
		(group) => group.id === $designTokensGroupStore[groupIndex]!.parentGroup
	)?.id

	const handleUnselectNameInput = () => {
		if (groupId) {
			if (
				$designTokensGroupStore[groupIndex]!.name === undefined ||
				$designTokensGroupStore[groupIndex]!.name === ''
			) {
				$designTokensGroupStore[groupIndex]!.name = 'Untitled'
			}
		}
	}

	// let input

	// $: if (
	// 	input &&
	// 	$designTokensGroupStore[groupIndex] &&
	// 	($designTokensGroupStore[groupIndex].name === undefined ||
	// 		$designTokensGroupStore[groupIndex].name === '')
	// ) {
	// 	console.log('bala')

	// 	input.select()
	// }
</script>

{#if $designTokensGroupStore[groupIndex]}
	{#if groupId && groupIndex}
		{#if parentGroupId != undefined && parentGroupId != $page.params.designSystemId}
			<svelte:self groupId={parentGroupId} lastItem={false} />
		{/if}
		<span class="text-lg text-gray-200"> / </span>
		{#if lastItem}
			<Input
				type="text"
				placeholder="Untitled"
				class="w-fit border-none px-1 text-lg"
				id={`group-name-${groupId}`}
				autoSelect={true}
				autoName="Untitled"
				bind:value={$designTokensGroupStore[groupIndex].name}
				on:focusout={handleUnselectNameInput}
				autoWidth={true}
			/>
		{:else}
			<a
				href={`/${$page.params.designSystemId}/${groupId}`}
				class="text-lg text-gray-500 hover:underline"
			>
				{$designTokensGroupStore[groupIndex].name}
			</a>
		{/if}
	{/if}
{/if}
