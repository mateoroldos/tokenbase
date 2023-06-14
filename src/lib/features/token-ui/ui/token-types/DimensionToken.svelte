<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import dimensionSuite from '$lib/features/token-management/dimension/dimensionSuite'
	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement
		const name = target.name

		res = dimensionSuite(target.value, 'dimension')
		console.log(target.value)
		console.log(res.isValid('dimension'))
	}

	let res = dimensionSuite.get()

	let options = ['px', 'rem']

	export let token: IToken<'dimension'>
</script>

<div class="flex gap-6">
	<div>
		<InputWrapper
			name="dimension"
			errors={res.getErrors('dimension')}
			isValid={res.isValid('dimension')}
		>
			<input
				name="dimension"
				class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
				type="number"
				on:input={handleChange}
				bind:value={token.value.value}
			/>
		</InputWrapper>
	</div>
	<div>
		<select
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			bind:value={token.value.unit}
		>
			{#each options as option}
				<option value={option}>
					{option}
				</option>
			{/each}
		</select>
	</div>
</div>
