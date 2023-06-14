<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import numberSuite from '$lib/features/token-management/number/numberSuite'

	export let token: IToken<'number'>

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement
		const name = target.name

		res = numberSuite(target.value, name)
	}

	let res = numberSuite.get()
</script>

<div>
	<InputWrapper
		name="numberToken"
		errors={res.getErrors('numberToken')}
		isValid={res.isValid('numberToken')}
	>
		<input
			class="border border-solid border-black"
			type="number"
			name="numberToken"
			bind:value={token.value}
			on:input={handleChange}
		/>
	</InputWrapper>
</div>
