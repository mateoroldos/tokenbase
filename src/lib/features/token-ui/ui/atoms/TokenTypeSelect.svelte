<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import * as Select from '$lib/components/ui/select'

	export let value: TokenType
</script>

<Select.Root bind:value on:change>
	<Select.Trigger class="w-[140px]">
		<Select.Value />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each tokenTypesArray as contentType}
				<Select.Item value={contentType} label={contentType}
					>{contentType}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input />
</Select.Root>

<!-- <select
	bind:value
	on:change
	class="appearance-none rounded-sm border-none bg-gray-200 px-2 py-1 text-xs font-medium leading-tight text-gray-700 focus:outline-none"
>
	{#each tokenTypesArray as contentType}
		<option value={contentType}>
			{contentType}
		</option>
	{/each}
</select> -->
