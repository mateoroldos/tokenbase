<script lang="ts">
	import type { createDesignSystemStore } from '$lib/features/token-groups-store/designSystemStore'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { getContext } from 'svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	// const designSystemStore: ReturnType<typeof createDesignSystemStore> =
	// 	getContext('designSystemStore')

	// console.log(designTokensGroupStore)
	// console.log(designSystemStore)
</script>

<div>Tokenbase</div>
