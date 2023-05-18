<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'number'>
</script>

<div>
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={token.value}
	/>
</div>
