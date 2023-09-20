<script lang="ts">
	import { Input } from '$lib/components/ui/input'
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
	<Input
		class="h-8 w-[80px] "
		type="number"
		name="numberToken"
		{...isAlias ? { disabled: true } : {}}
		bind:value={token.value}
		on:input={handleChange}
	/>
</div>
