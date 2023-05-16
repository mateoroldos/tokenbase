<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'cubicBezier'>

	let cubicBezierValue: [number, number, number, number] = [0, 0, 0, 0]

	$: {
		token.value = cubicBezierValue
	}
</script>

<div class="flex gap-x-3">
	<div class="flex">
		<input
			class="w-10 border border-solid border-black"
			type="number"
			bind:value={cubicBezierValue[0]}
			min="0"
			max="1"
			id="p1x"
		/><label for="p1x">P1x</label>
	</div>
	<div class="flex">
		<input
			id="p1y"
			class="w-10 border border-solid border-black"
			type="number"
			size="1"
			bind:value={cubicBezierValue[1]}
		/><label for="p1y">P1y</label>
	</div>
	<div class="flex">
		<input
			id="p2x"
			class="w-10 border border-solid border-black"
			type="number"
			bind:value={cubicBezierValue[2]}
		/><label for="p2x">P2x</label>
	</div>
	<div class="flex">
		<input
			id="p2y"
			class=" w-10 border border-solid border-black"
			type="number"
			bind:value={cubicBezierValue[3]}
			min="0"
			max="1"
		/><label for="p2y">P2y</label>
	</div>
</div>

<style>
	input {
		display: inline-block;
	}
</style>
