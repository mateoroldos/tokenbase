<script lang="ts">
	import { page } from '$app/stores'
	import { Input } from '$lib/components/ui/input'
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'

	export let groupIndex: number
	export let lastItem = true

	$: parentGroupIndex = $groupsStore[groupIndex]?.parentGroup
		? $groupsStore.findIndex(
				(group) => group.id === $groupsStore[groupIndex]?.parentGroup
		  )
		: null

	const handleUnselectNameInput = () => {
		if (
			$groupsStore[groupIndex]?.name === undefined ||
			$groupsStore[groupIndex]?.name === ''
		) {
			$groupsStore[groupIndex].name = 'Untitled'
		}
	}
</script>

{#if parentGroupIndex !== null && parentGroupIndex >= 0}
	<svelte:self groupIndex={parentGroupIndex} lastItem={false} />
{/if}
<Breadcrumbs.Divider />
{#if lastItem}
	<Input
		type="text"
		placeholder="Untitled"
		class="h-fit w-fit border-none px-0 py-0 text-sm font-medium text-slate-700"
		id={`group-name-${$groupsStore[groupIndex]?.id}`}
		autoSelect={true}
		autoWidth={true}
		autoName="Untitled"
		bind:value={$groupsStore[groupIndex].name}
		on:focusout={handleUnselectNameInput}
	/>
{:else}
	<Breadcrumbs.Element
		href={`/${$page.params.designSystemId}/${$groupsStore[groupIndex]?.id}`}
		name={$groupsStore[groupIndex]?.name}
	/>
{/if}
