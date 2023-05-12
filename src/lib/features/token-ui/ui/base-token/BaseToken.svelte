<script lang="ts">
	import type {
		Token,
		TokenType
	} from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'

	export let token: Token
</script>

<div
	class="flex flex-row justify-between border-b border-solid border-gray-200 px-8 py-3"
>
	<span
		bind:textContent={token.name}
		contenteditable="true"
	/>
	<select bind:value={token.type}>
		{#each tokenTypesArray as contentType}
			<option value={contentType}>
				{contentType}
			</option>
		{/each}
	</select>
	<slot />
</div>
