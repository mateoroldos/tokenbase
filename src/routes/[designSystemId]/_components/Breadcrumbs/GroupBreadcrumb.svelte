<script lang="ts">
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import { Input } from '$lib/components/ui/input'
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
</script>

{#if $designTokensGroupStore[groupIndex]}
	{#if groupId}
		{#if parentGroupId != undefined && parentGroupId != $page.params.designSystemId}
			<svelte:self groupId={parentGroupId} lastItem={false} />
		{/if}
		<span class="text-md text-slate-200"> / </span>
		{#if lastItem}
			<Input
				type="text"
				placeholder="Untitled"
				class="h-fit w-fit border-none px-1 py-0 text-sm leading-none"
				id={`group-name-${groupId}`}
				autoSelect={true}
				autoWidth={true}
				autoName="Untitled"
				bind:value={$designTokensGroupStore[groupIndex].name}
				on:focusout={handleUnselectNameInput}
			/>
		{:else}
			<a
				href={`/${$page.params.designSystemId}/${groupId}`}
				class="text-sm text-slate-500 hover:underline"
			>
				{$designTokensGroupStore[groupIndex].name}
			</a>
		{/if}
	{/if}
{/if}
