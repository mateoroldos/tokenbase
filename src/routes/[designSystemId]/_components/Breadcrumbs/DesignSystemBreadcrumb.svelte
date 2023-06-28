<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.designSystems.findIndex(
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
		$tokenBaseMainStore.activeDesignSystemRootId = designSystemId
		goto(`/${designSystemId}`)
	}
</script>

<div class="flex flex-row items-center">
	<a
		href={`/${$page.params.designSystemId}`}
		class="text-lg text-gray-500 hover:underline"
	>
		{$tokenBaseMainStore.designSystems[activeDesignSystemIndex].name}
	</a>

	<!-- TODO: replace with select component -->
	<select
		name="design-system"
		id="design-system"
		on:change={handleChangeDesignSystem}
	>
		{#each $tokenBaseMainStore.designSystems as designSystem}
			<option value={designSystem.id}>{designSystem.name}</option>
		{/each}
	</select>
</div>
