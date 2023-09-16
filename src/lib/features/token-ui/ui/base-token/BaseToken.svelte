<script lang="ts">
	import type {
		IToken,
		TokenType
	} from '$lib/features/token-groups-store/types/token-interface'
	import { Link2Off } from 'lucide-svelte'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { page } from '$app/stores'
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import nameSuite from '$lib/features/token-management/nameSuite'
	import DescriptionDialog from './atoms/DescriptionDialog.svelte'
	import TokenAliasDialog from './atoms/TokenAliasDialog.svelte'
	import * as Table from '$lib/components/ui/table'
	import { Input } from '$lib/components/ui/input'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	let selectedType: string

	$: selected = $selectedTokensStore.includes(token)

	$: if (!$selectedTokensStore.includes(token) && selected) {
		selectedTokensStore.addToken(token)
	} else if ($selectedTokensStore.includes(token) && !selected) {
		selectedTokensStore.removeToken(token.id)
	}

	const handleTokenTypeChange = (tokenType: TokenType) => {
		token = {
			...token,
			value: getDefaultTokenValues(tokenType),
			type: tokenType
		}
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
		selectedType = token.type
	})
</script>

<Table.Row
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
	key={token.id}
	class="border-slate-100"
>
	<Table.Cell class="pr-0">
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
	</Table.Cell>
	<Table.Cell class="pr-0">
		<TokenTypeSelect
			bind:value={token.type}
			onChangeFn={handleTokenTypeChange}
		/>
	</Table.Cell>
	<Table.Cell class="pr-0">
		<!-- <InputWrapper
			name="name"
			errors={res.getErrors('name')}
			isValid={res.isValid('name')}
		> -->
		<Input
			class="h-7 w-40 border-none px-1 py-1 pr-6 text-sm font-medium"
			id={`${token.id}-name`}
			placeholder="Untitled"
			name="name"
			on:input={handleChange}
			bind:value={token.name}
			on:focusout={handleUnselectNameInput}
		/>
		<!-- </InputWrapper> -->
	</Table.Cell>
	<Table.Cell>
		<div class="flex flex-row gap-3">
			<DescriptionDialog bind:token />
			{#if token.alias}
				<button on:click={removeAlias}><Link2Off class="h-4 w-4" /></button>
			{:else}
				<TokenAliasDialog bind:token />
			{/if}
		</div>
	</Table.Cell>
	<Table.Cell class="w-full">
		<slot />
	</Table.Cell>
</Table.Row>
