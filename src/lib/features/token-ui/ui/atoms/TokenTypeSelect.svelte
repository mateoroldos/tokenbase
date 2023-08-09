<script lang="ts">
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import { XCircle } from 'lucide-svelte'

	export let value: TokenType
</script>

<select
	bind:value
	on:change
	class="appearance-none rounded-sm border-none bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 leading-tight focus:outline-none"
>
	{#each tokenTypesArray as contentType}
		<option value={contentType}>
			{contentType}
		</option>
	{/each}
</select>
