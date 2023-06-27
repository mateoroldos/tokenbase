<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import Icon from '@iconify/svelte'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import descriptionSuite from '../generic-validations/descriptionSuite'
	import { Checkbox } from '$components/ui/checkbox'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	let selected: boolean = $selectedTokensStore.includes(token) || false

	$: if (selected) {
		selectedTokensStore.addToken(token)
	} else if (!selected) {
		selectedTokensStore.removeToken(token)
	}

	const handleTokenTypeChange = () => {
		token.value = getDefaultTokenValues(token.type)
	}

	const handleDeleteToken = () => {
		selectedTokensStore.removeToken(token)
		designTokensGroupStore.deleteToken(token.id)
	}

	const handleUnselectNameInput = () => {
		if (token.name === undefined || token.name === '') {
			token.name = 'Untitled'
		}
	}

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = descriptionSuite(target.value, 'description')
	}

	let res = descriptionSuite.get()

	let showTokenList = false

	const toggleTokenList = () => {
		showTokenList = !showTokenList
	}

	const createTokenAlias = (groupId: string, tokenId: string) => {
		token.alias = {
			groupId,
			tokenId
		}
	}

	onMount(() => {
		if (token.name === undefined) {
			const input = document.getElementById(
				`${token.id}-name`
			) as HTMLInputElement
			input?.select()
		}
	})
</script>

<div
	class="flex flex-row items-center gap-10 border-b border-solid border-gray-200 px-3 py-2"
	class:bg-gray-100={draggedTokenId === token.id}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
>
	<div class="flex flex-row items-center gap-1">
		<div class="flex w-8 flex-row items-center justify-between">
			<div>
				{#if hover}
					<div on:dragstart draggable={true} class="cursor-grab">
						<Icon icon="tabler:line-height" class="text-gray-400" />
					</div>
				{/if}
			</div>
			{#if hover || selected}
				<Checkbox bind:checked={selected} />
			{/if}
		</div>
		<div class="flex flex-row gap-1">
			<TokenTypeSelect
				bind:value={token.type}
				on:change={handleTokenTypeChange}
			/>
			<input
				class="px-1 text-sm font-medium"
				id={`${token.id}-name`}
				placeholder="Untitled"
				bind:value={token.name}
				on:focusout={handleUnselectNameInput}
			/>
			<div>
				<InputWrapper
					name="description"
					errors={res.getErrors('description')}
					isValid={res.isValid('description')}
				>
					<input
						bind:value={token.description}
						on:input={handleChange}
						placeholder="Description"
						class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
					/></InputWrapper
				>
			</div>
			<button on:click={toggleTokenList}>
				<Icon icon="tabler:plus" />
			</button>
		</div>
		{#if showTokenList}
			<div class="token-list">
				{#each $designTokensGroupStore as group}
					{#if group.tokens.length > 0}
						{#each group.tokens as t}
							<div>
								<button on:click={() => createTokenAlias(group.id, t.id)}
									>{t.name}</button
								>
							</div>
						{/each}
					{/if}
				{/each}
			</div>
		{/if}
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
