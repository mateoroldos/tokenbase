<script lang="ts">
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import { Input } from '$lib/components/ui/input'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import { ChevronRight } from 'lucide-svelte'

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
		<span class="text-xs font-medium text-slate-200">
			<ChevronRight class="w-4" />
		</span>
		{#if lastItem}
			<Input
				type="text"
				placeholder="Untitled"
				class="h-fit w-fit border-none px-0 py-0 text-sm font-medium text-slate-700"
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
				class="text-sm font-medium text-slate-400 transition-colors hover:text-slate-500"
			>
				{$designTokensGroupStore[groupIndex].name}
			</a>
		{/if}
	{/if}
{/if}
