<script lang="ts">
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { getContext } from 'svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
</script>

<div>Tokenbase</div>
