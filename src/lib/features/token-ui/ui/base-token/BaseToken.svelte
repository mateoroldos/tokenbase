<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { GripVertical, Link2Off } from 'lucide-svelte'
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
	import TokenAliasDialog from './atoms/TokenAliasDialog.svelte'
	import {
    TableCell,
    TableRow
  } from "$components/ui/table";
	import Input from '$components/ui/input/Input.svelte'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	$: selected = $selectedTokensStore.includes(token)

	$: if (!$selectedTokensStore.includes(token) && selected) {
		selectedTokensStore.addToken(token)
	} else if ($selectedTokensStore.includes(token) && !selected) {
		selectedTokensStore.removeToken(token.id)
	}

	const handleTokenTypeChange = () => {
		token.value = getDefaultTokenValues(token.type)
	}

	let res = nameSuite.get()

	const removeAlias = () => {
		token = JSON.parse(JSON.stringify(token))
		token.alias = undefined
	}

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

<TableRow
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
	key={token.id}
	class="border-gray-200"
>
	<TableCell class="pr-0">
		<!-- <div on:dragstart draggable={true} class="cursor-grab">
			<GripVertical class="h-3 w-3 text-gray-500" />
		</div> -->
		<input 
			type="checkbox"
			bind:checked={selected} 
			class="h-4 w-4"
			on:change={() => {
				if ($selectedTokensStore.includes(token)) {
					selectedTokensStore.removeToken(token.id)
				} else {
					selectedTokensStore.addToken(token)
				}
			}}
		/>
	</TableCell>
	<TableCell class="pr-0">
		<TokenTypeSelect
			bind:value={token.type}
			on:change={handleTokenTypeChange}
		/>
	</TableCell>
	<TableCell class="pr-0">
		<InputWrapper
			name="name"
			errors={res.getErrors('name')}
			isValid={res.isValid('name')}
		>
			<Input
				class="px-1 py-1 h-7 text-sm font-medium border-none w-40 pr-6"
				id={`${token.id}-name`}
				placeholder="Untitled"
				name="name"
        on:input={handleChange}
        bind:value={token.name}
        on:focusout={handleUnselectNameInput}
			/>
    </InputWrapper>
	</TableCell>
	<TableCell>
		<div class="flex flex-row gap-3">
			<DescriptionDialog bind:token/>		
			{#if token.alias}
			<button on:click={removeAlias}><Link2Off class="h-4 w-4" /></button>
			{:else}
			<TokenAliasDialog bind:token />
			{/if}
		</div>
	</TableCell>
	<TableCell>
		<slot />
	</TableCell>
</TableRow>
