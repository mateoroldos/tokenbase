<script lang="ts">
	import TokenAliasControler from '../../../aliases/components/token-alias-controler/TokenAliasControler.svelte'
	import type {
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import DescriptionDialog from './atoms/DescriptionDialog.svelte'
	import * as Table from '$lib/components/ui/table'
	import { Input } from '$lib/components/ui/input'
	import { viewMode } from '../../../viewMode/stores/viewMode'
	import type { Readable } from 'svelte/store'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { page } from '$app/stores'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'

	export let token: IToken
	export let isAlias: boolean
	export let activeThemeId: string

	const activeDesignSystemThemesStore: Readable<Theme[]> = getContext(
		'activeDesignSystemThemesStore'
	)

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	$: selected = $selectedTokensStore.includes(token.id)

	const handleTokenTypeChange = (tokenType: TokenType) => {
		if (!isAlias) {
			const tokenValues: {
				[themeId: string]: TokenValue<typeof tokenType>
			} = {}

			const newTokenTypeDefaultValue = getDefaultTokenValues(
				tokenType
			) as TokenValue

			$activeDesignSystemThemesStore.forEach((theme) => {
				tokenValues[theme.id] = newTokenTypeDefaultValue
			})

			token = {
				...token,
				value: tokenValues,
				type: tokenType
			}
		}
	}

	const handleUnselectNameInput = () => {
		if (token.name === undefined || token.name === '') {
			token.name = 'Untitled'
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

<Table.Row
	on:dragenter
	on:dragend
	ondragover="return false"
	key={token.id}
	class="border-slate-100 hover:bg-transparent"
>
	<Table.Cell class="pr-0">
		<input
			disabled={$viewMode}
			type="checkbox"
			bind:checked={selected}
			class="h-4 w-4"
			on:change={() => {
				if ($selectedTokensStore.includes(token.id)) {
					selectedTokensStore.removeToken(token.id)
				} else {
					selectedTokensStore.addToken(token.id)
				}
			}}
		/>
	</Table.Cell>
	<Table.Cell class="pr-0">
		<TokenTypeSelect
			bind:value={token.type}
			onChangeFn={handleTokenTypeChange}
			disabled={isAlias}
		/>
	</Table.Cell>
	<Table.Cell class="pr-0">
		{#if $viewMode}
			<p class="h-7 w-40 border-none px-1 py-1 pr-6 text-sm font-medium">
				{token.name}
			</p>
		{:else}
			<Input
				class="h-7 w-40 border-none px-1 py-1 pr-6 text-sm font-medium"
				id={`${token.id}-name`}
				placeholder="Untitled"
				name="name"
				bind:value={token.name}
				on:focusout={handleUnselectNameInput}
			/>
		{/if}
	</Table.Cell>
	<Table.Cell>
		<div class="flex flex-row items-center gap-1">
			<DescriptionDialog bind:token />
			{#if $page.params.groupId}
				<TokenAliasControler
					bind:token
					{activeThemeId}
					{isAlias}
					{groupsStore}
				/>
			{/if}
		</div>
	</Table.Cell>
	<Table.Cell class="w-full">
		<slot />
	</Table.Cell>
</Table.Row>
