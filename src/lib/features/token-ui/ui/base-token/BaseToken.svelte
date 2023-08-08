<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { GripVertical, Trash2 } from 'lucide-svelte'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import { Checkbox } from '$components/ui/checkbox'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { page } from '$app/stores'
	import InputWrapper from '$components/InputWrapper.svelte'
	import nameSuite from '$lib/features/token-management/nameSuite'
	import DescriptionDialog from './atoms/DescriptionDialog.svelte'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	let selected: boolean = $selectedTokensStore.includes(token)

	$: if (!$selectedTokensStore.includes(token) && selected) {
		selectedTokensStore.addToken(token)
	} else if ($selectedTokensStore.includes(token) && !selected) {
		selectedTokensStore.removeToken(token)
	}

	const handleTokenTypeChange = () => {
		token.value = getDefaultTokenValues(token.type)
	}

	let res = nameSuite.get()

	const handleUnselectNameInput = () => {
		if (token.name === undefined || token.name === '') {
			token.name = 'Untitled'
		}
		res = nameSuite(
			token.name,
			'name',
			$designTokensGroupStore
				.find((g) => g.id === $page.params.groupId)
				?.tokens.map((t) => t.name)
		)
	}

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement
		res = nameSuite(
			token.name,
			'name',
			$designTokensGroupStore
				.find((g) => g.id === $page.params.groupId)
				?.tokens.map((t) => t.name)
		)
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
	class="flex flex-row items-center gap-14 border-b border-solid border-gray-200 py-4 pl-4 pr-9"
	class:bg-gray-100={draggedTokenId === token.id}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
>
	<div class="flex flex-row items-center gap-6">
		<div class="flex flex-row gap-2">
			<div class="flex w-8 flex-row items-center justify-between">
				<div>
					{#if hover}
						<div on:dragstart draggable={true} class="cursor-grab">
							<GripVertical class="h-3 w-3 text-gray-500" />
						</div>
					{/if}
				</div>
				{#if hover || selected}
					<Checkbox bind:checked={selected} />
				{/if}
			</div>
			<TokenTypeSelect
				bind:value={token.type}
				on:change={handleTokenTypeChange}
			/>
			<InputWrapper
				name="name"
				errors={res.getErrors('name')}
				isValid={res.isValid('name')}
			>
				<input
					class="rounded-md bg-transparent px-1 text-sm font-medium"
					id={`${token.id}-name`}
					placeholder="Untitled "
					name="name"
					bind:value={token.name}
					on:focusout={handleUnselectNameInput}
					on:input={handleChange}
				/>
			</InputWrapper>
		</div>
		<div class="flex flex-row items-center gap-3">
			<DescriptionDialog bind:token />
		</div>
	</div>
	<slot />
</div>
