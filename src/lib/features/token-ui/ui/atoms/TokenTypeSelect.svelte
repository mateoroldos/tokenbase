<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import * as Select from '$lib/components/ui/select'
	import formatTokenType from '$lib/utils/formatTokenType'

	export let value: TokenType
	export let onChangeFn: (value: TokenType) => void
</script>

<Select.Root bind:value onValueChange={(value) => onChangeFn(value)}>
	<Select.Trigger class="w-[140px]">
		<Select.Value />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each tokenTypesArray as contentType}
				<Select.Item value={contentType} label={formatTokenType(contentType)}
					>{formatTokenType(contentType)}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input />
</Select.Root>
