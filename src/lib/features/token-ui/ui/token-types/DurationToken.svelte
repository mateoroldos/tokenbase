<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'duration'>
</script>

<div>
	<input
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="number"
		bind:value={token.value}
	/>ms
</div>
