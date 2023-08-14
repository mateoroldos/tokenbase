<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: groupId = $page.params.groupId
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

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

	const handleChangeDesignSystem = (event: Event) => {
		const select = event.target as HTMLSelectElement
		const designSystemId = select.value

		goto(`/${designSystemId}`)
	}
</script>

<div class="flex flex-row items-center">
	<a
		href={`/${$page.params.designSystemId}`}
		class="text-md text-gray-500 hover:underline"
	>
		{$tokenBaseMainStore[activeDesignSystemIndex]?.name}
	</a>

	<!-- TODO: replace with select component -->
	<!-- <select
		name="design-system"
		id="design-system"
		on:change={handleChangeDesignSystem}
	>
		{#each $tokenBaseMainStore.designSystems as designSystem}
			<option value={designSystem.id}>{designSystem.name}</option>
		{/each}
	</select> -->
</div>
