<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'duration'>

	let durationValue: number
	$: token.value = `${durationValue}ms`
</script>

<div>
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={durationValue}
	/>ms
</div>
