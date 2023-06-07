<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	import suite from '../validations/suite'

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = suite(target.value, 'numberToken')
		console.log(res.isValid('numberToken'))
	}

	let res = suite.get()

	export let token: IToken<'number'>
</script>

<div>
	<input
		class="border border-solid border-black"
		type="number"
		name="numberToken"
		bind:value={token.value}
		on:input={handleChange}
	/>
</div>
