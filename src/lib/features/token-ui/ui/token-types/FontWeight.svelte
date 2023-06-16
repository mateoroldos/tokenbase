<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import fontWeightSuite from '$lib/features/token-management/font-weight/fontWeightSuite'

	export let token: IToken<'fontWeight'>
	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = fontWeightSuite(target.value, name)
	}

	let res = fontWeightSuite.get()
</script>

<InputWrapper
	name="fontWeight"
	errors={res.getErrors('fontWeight')}
	isValid={res.isValid('fontWeight')}
>
	<input
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="text"
		name="fontWeight"
		{...isAlias ? { disabled: true } : {}}
		bind:value={token.value}
		on:input={handleChange}
	/>
</InputWrapper>
