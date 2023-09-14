<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import numberSuite from '$lib/features/token-management/number/numberSuite'

	export let token: IToken<'number'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return

		const target = input.target as HTMLInputElement
		const name = target.name

		res = numberSuite(target.value, name)
	}

	let res = numberSuite.get()
</script>

<div>
	<input
		class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
		type="number"
		name="numberToken"
		{...isAlias ? { disabled: true } : {}}
		bind:value={token.value}
		on:input={handleChange}
	/>
</div>
