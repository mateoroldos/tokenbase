<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'fontWeight'>
</script>

<div>
	<input
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="text"
		bind:value={token.value}
	/>
</div>
