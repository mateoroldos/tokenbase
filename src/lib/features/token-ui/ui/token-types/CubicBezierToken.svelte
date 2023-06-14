<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import cubicBezierSuite from '$lib/features/token-management/cubic-bezier/cubicBezierSuite'

	export let token: IToken<'cubicBezier'>

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement
		const name = target.name

		switch (name) {
			case 'p1x':
				res = cubicBezierSuite(target.value, 'p1x')
				console.log(res.isValid('p1x'))
				break
			case 'p1y':
				res = cubicBezierSuite(target.value, 'p1y')
				console.log(res.isValid('p1y'))
				break
			case 'p2x':
				res = cubicBezierSuite(target.value, 'p2x')
				console.log(res.isValid('p2x'))
				break
			case 'p2y':
				res = cubicBezierSuite(target.value, 'p2y')
				console.log(res.isValid('p2y'))
				break
			default:
				console.log('Invalid input name')
		}
	}

	let res = cubicBezierSuite.get()
</script>

<div class="flex gap-x-3">
	<InputWrapper
		name="p1x"
		errors={res.getErrors('p1x')}
		isValid={res.isValid('p1x')}
	>
		<input
			name="p1x"
			class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			bind:value={token.value[0]}
			on:input={handleChange}
			min="0"
			max="1"
			id="p1x"
		/>p1x
	</InputWrapper>

	<InputWrapper
		name="p1y"
		errors={res.getErrors('p1y')}
		isValid={res.isValid('p1y')}
	>
		<input
			id="p1y"
			name="p1y"
			class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			size="1"
			on:input={handleChange}
			bind:value={token.value[1]}
		/>p1y
	</InputWrapper>

	<InputWrapper
		name="p2x"
		errors={res.getErrors('p2x')}
		isValid={res.isValid('p2x')}
	>
		<input
			id="p2x"
			name="p2x"
			class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			on:input={handleChange}
			bind:value={token.value[2]}
		/>p2x
	</InputWrapper>

	<InputWrapper
		name="p2y"
		errors={res.getErrors('p2y')}
		isValid={res.isValid('p2y')}
	>
		<input
			id="p2y"
			name="p2y"
			class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			on:input={handleChange}
			bind:value={token.value[3]}
			min="0"
			max="1"
		/>p2y
	</InputWrapper>
</div>
