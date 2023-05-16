<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'cubicBezier'>

	let cubicBezierValue: number[]
	$: token.value = cubicBezierValue
</script>

<div>
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={cubicBezierValue[0]}
		min="0"
		max="1"
	/>P1x
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={cubicBezierValue[1]}
	/>P1y
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={cubicBezierValue[2]}
	/>P2x
	<input
		class="border border-solid border-black"
		type="number"
		bind:value={cubicBezierValue[3]}
		min="0"
		max="1"
	/>P2y
</div>
