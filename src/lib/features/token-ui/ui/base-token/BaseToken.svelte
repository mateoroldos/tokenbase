<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { DesignTokensStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import Icon from '@iconify/svelte'
	import { getContext } from 'svelte'

	export let token: Token

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	)

	let hover = false
</script>

<div
	class="flex flex-row items-center gap-7 border-b border-solid border-gray-200 px-8 py-3"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
>
	<div class="flex flex-row gap-2">
		<span
			bind:textContent={token.name}
			contenteditable="true"
			class="w-32 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
		/>
		<select
			bind:value={token.type}
			class="w-24 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
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
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
		/>
	</div>
	<slot />
	<div class="w-3">
		{#if hover}
			<button
				on:click={() => designTokensGroupStore.deleteToken(token.id)}
				class="bg-transparent"
				in:fly={{ x: -5, duration: 350 }}
			>
				<Icon icon="tabler:trash" class="text-red-500" />
			</button>
		{/if}
	</div>
</div>
