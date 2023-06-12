<script lang="ts">
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbase-main-store'
	import { v4 as uuidv4 } from 'uuid'
	import { getContext } from 'svelte'
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import { goto } from '$app/navigation'

	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	const handleAddDesignSystem = () => {
		const designSystemId = uuidv4()
		tokenBaseMainStore.addDesignSystem(designSystemId, 'Test')
		designTokensGroupStore.addGroup('Default', designSystemId)
		tokenBaseMainStore.selectDesignSystem(designSystemId)
		goto(`/${designSystemId}`)
	}
</script>

<select
	bind:value={$tokenBaseMainStore.activeDesignSystemRootId}
	name="active-design-system"
	id="active-design-system"
>
	{#each $tokenBaseMainStore.designSystems as element}
		<option value={element.id}>{element.name}</option>
	{/each}
</select>
<button on:click={handleAddDesignSystem}>add design system</button>
