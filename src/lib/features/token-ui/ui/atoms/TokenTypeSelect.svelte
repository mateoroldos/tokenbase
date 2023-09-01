<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'

	export let value: TokenType
</script>

<select
	bind:value
	on:change
	class="appearance-none rounded-sm border-none bg-gray-200 px-2 py-1 text-xs font-medium leading-tight text-gray-700 focus:outline-none"
>
	{#each tokenTypesArray as contentType}
		<option value={contentType}>
			{contentType}
		</option>
	{/each}
</select>
