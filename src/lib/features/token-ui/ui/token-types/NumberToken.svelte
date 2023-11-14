<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import type { NumberTokenValue } from '$lib/features/token-management/number/types/internal-number-value.type'

	export let tokenValue: NumberTokenValue
	export let isAlias: boolean
</script>

<div>
	<Input
		class="h-8 w-[80px] "
		type="number"
		name="numberToken"
		{...isAlias ? { disabled: true } : {}}
		bind:value={tokenValue}
	/>
</div>
