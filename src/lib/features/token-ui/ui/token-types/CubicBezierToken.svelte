<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import suite from '../validations/suite'

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = suite(target.value, 'p1x')
		console.log(res.isValid('p1x'))
	}

	let res = suite.get()

	export let token: IToken<'cubicBezier'>
</script>

<div class="flex gap-x-3">
	<div class="flex">
		<input
			name="p1x"
			class="w-10 border border-solid border-black"
			type="number"
			bind:value={token.value[0]}
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
			bind:value={token.value[1]}
		/><label for="p1y">P1y</label>
	</div>
	<div class="flex">
		<input
			id="p2x"
			class="w-10 border border-solid border-black"
			type="number"
			bind:value={token.value[2]}
		/><label for="p2x">P2x</label>
	</div>
	<div class="flex">
		<input
			id="p2y"
			class=" w-10 border border-solid border-black"
			type="number"
			bind:value={token.value[3]}
			min="0"
			max="1"
		/><label for="p2y">P2y</label>
	</div>
</div>
