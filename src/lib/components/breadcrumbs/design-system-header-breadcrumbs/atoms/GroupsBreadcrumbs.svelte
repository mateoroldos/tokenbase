<script lang="ts">
	import { page } from '$app/stores'
	import { Input } from '$lib/components/ui/input'
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { Readable, Writable } from 'svelte/store'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import { goto } from '$app/navigation'
	import type { PreviewStore } from '$lib/features/preview-template-modal/types/preview-store.type'

	export let groupsStore: GroupsStore | Readable<Group[]>
	export let groupIndex: number
	export let noLink = true
	export let previewStore: PreviewStore | null = null
	export let viewMode = false

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

	const handleNavigateToGroup = () => {
		if (previewStore && $previewStore !== null) {
			$previewStore.activeGroupId = $groupsStore[groupIndex]?.id as string
		} else {
			goto(`/${$page.params.designSystemId}/${$groupsStore[groupIndex]?.id}`)
		}
	}
</script>

{#if parentGroupIndex !== null && parentGroupIndex >= 0}
	<svelte:self
		groupIndex={parentGroupIndex}
		noLink={false}
		{groupsStore}
		{previewStore}
		{viewMode}
	/>
{/if}
<Breadcrumbs.Divider />
{#if noLink && !viewMode}
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
		{noLink}
		on:click={handleNavigateToGroup}
		name={$groupsStore[groupIndex]?.name}
	/>
{/if}
