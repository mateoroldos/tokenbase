<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'

	export let token: Token
</script>

<div
	class="flex flex-row gap-4 border-b border-solid border-gray-200 px-8 py-3"
>
	<span
		bind:textContent={token.name}
		contenteditable="true"
		class="w-32 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
	/>
	<select
		bind:value={token.type}
		class="w-32 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
	>
		{#each tokenTypesArray as contentType}
			<option value={contentType}>
				{contentType}
			</option>
		{/each}
	</select>
	<input
		bind:value={token.description}
		placeholder="Description"
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
	/>
	<slot />
</div>
