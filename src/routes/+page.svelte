<script lang="ts">
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup'
	import { getContext } from 'svelte'

	const designTokensGroupStore: DesignTokensStore =
		getContext('designTokensGroupStore')
</script>

<div>Tokenbase</div>
