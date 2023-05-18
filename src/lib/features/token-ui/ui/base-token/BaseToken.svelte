<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import Icon from '@iconify/svelte'
	import { getContext } from 'svelte'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	let selected: boolean = $selectedTokensStore.includes(token) || false

	const handleDeleteToken = () => {
		selectedTokensStore.removeToken(token)
		designTokensGroupStore.deleteToken(token.id)
	}

	const handleSelectTokenChange = () => {
		if (selected) {
			selectedTokensStore.addToken(token)
		} else {
			selectedTokensStore.removeToken(token)
		}
	}
</script>

<div
	class="flex flex-row items-center gap-7 border-b border-solid border-gray-200 px-8 py-3"
	class:bg-gray-100={draggedTokenId === token.id}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
>
	<div on:dragstart draggable={true} class="cursor-grab">
		<Icon icon="tabler:line-height" class="text-gray-400" />
	</div>
	<div class="flex flex-row gap-2">
		<input
			type="checkbox"
			bind:checked={selected}
			on:change={handleSelectTokenChange}
		/>
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
				on:click={handleDeleteToken}
				class="bg-transparent"
				in:fly={{ x: -5, duration: 350 }}
			>
				<Icon icon="tabler:trash" class="text-red-500" />
			</button>
		{/if}
	</div>
</div>
