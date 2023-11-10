<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import * as Select from '$lib/components/ui/select'
	import formatTokenType from '$lib/utils/formatTokenType'
	import { viewMode } from '../../../viewMode/stores/viewMode';

	export let value: TokenType
	export let onChangeFn: (value: TokenType) => void

	// Workaround to prevent onChangeFn firing on first render
	let firstChange = 0
</script>

<Select.Root disabled={$viewMode}
	bind:value
	onValueChange={(val) => {
		if (firstChange > 0) {
			onChangeFn(val)
		}
		firstChange++
	}}
>
	<Select.Trigger class="w-[140px] disabled:opacity-1">
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
