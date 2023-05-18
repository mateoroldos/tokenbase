<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'number'>
</script>

<div>
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={token.value}
	/>
</div>
