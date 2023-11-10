<script lang="ts">
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import { Input } from '$lib/components/ui/input'
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
	import numberSuite from '$lib/features/token-management/number/numberSuite'
	import type { NumberTokenValue } from '$lib/features/token-management/number/internal-number-value.type'

	export let tokenValue: NumberTokenValue
	export let isAlias: boolean

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
		bind:value={tokenValue}
		on:input={handleChange}
	/>
</div>
