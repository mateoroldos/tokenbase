<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	import suite from '../validations/suite'

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = suite(target.value, 'duration')
		console.log(res.isValid('duration'))
	}

	let res = suite.get()

	export let token: IToken<'duration'>
</script>

<div>
	<input
		name="duration"
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="number"
		bind:value={token.value}
		on:input={handleChange}
	/>ms
</div>
