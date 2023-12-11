<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import * as Select from '$lib/components/ui/select'
	import formatTokenType from '$lib/utils/formatTokenType'

	export let value: TokenType
	export let onChangeFn: (value: TokenType) => void
	export let disabled = false

	// Workaround to prevent onChangeFn firing on first render
	let firstChange = 0
</script>

<Select.Root
	{disabled}
	bind:value
	onValueChange={(val) => {
		if (firstChange > 0) {
			onChangeFn(val)
		}
		firstChange++
	}}
>
	<Select.Trigger class="disabled:opacity-1 w-[120px] text-xs">
		<Select.Value />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each tokenTypesArray as contentType}
				<Select.Item
					value={contentType}
					label={formatTokenType(contentType)}
					class="text-xs">{formatTokenType(contentType)}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input />
</Select.Root>
