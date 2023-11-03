<script lang="ts">
	import { checkIfValueIsAlias } from '$lib/features/aliases/utils/checkIfValueIsAlias'
	import type {
		AliasValue,
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import { Link2Off } from 'lucide-svelte'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import DescriptionDialog from './atoms/DescriptionDialog.svelte'
	import TokenAliasDialog from '../../../aliases/components/TokenAliasDialog.svelte'
	import * as Table from '$lib/components/ui/table'
	import { Input } from '$lib/components/ui/input'
	import type { Readable } from 'svelte/store'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { resolveAliasIdToAliasType } from '$lib/features/aliases/utils/resolveAliasIdToAliasType'

	export let token: IToken
	export let isAlias: boolean
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	const activeDesignSystemThemesStore: Readable<Theme[]> = getContext(
		'activeDesignSystemThemesStore'
	)

	const activeThemeStore: Readable<Theme> = getContext('activeThemeStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	$: selected = $selectedTokensStore.includes(token.id)

	const handleTokenTypeChange = (tokenType: TokenType) => {
		const tokenValues: {
			[themeId: string]: TokenValue<typeof tokenType>
		} = {}

		$activeDesignSystemThemesStore.forEach((theme) => {
			const resolvedValue =
				checkIfValueIsAlias(token.value[theme.id] as TokenValue) &&
				resolveAliasIdToAliasType(
					(token.value[theme.id] as AliasValue).tokenId as string,
					(token.value[theme.id] as AliasValue).groupId as string,
					$designTokensGroupStore
				) === token.type
					? token.value[theme.id]
					: (getDefaultTokenValues(tokenType) as TokenValue)

			tokenValues[theme.id] = resolvedValue as TokenValue
		})
		token = {
			...token,
			value: tokenValues,
			type: tokenType
		}
	}

	const removeAlias = () => {
		// token = JSON.parse(JSON.stringify(token))
		// isAlias = undefined

		alert('remove alias')
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
	class="border-slate-100"
>
	<Table.Cell class="pr-0">
		<input
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
		/>
	</Table.Cell>
	<Table.Cell class="pr-0">
		<Input
			class="h-7 w-40 border-none px-1 py-1 pr-6 text-sm font-medium"
			id={`${token.id}-name`}
			placeholder="Untitled"
			name="name"
			bind:value={token.name}
			on:focusout={handleUnselectNameInput}
		/>
	</Table.Cell>
	<Table.Cell>
		<div class="flex flex-row gap-3">
			<DescriptionDialog bind:token />
			{#if isAlias}
				<button on:click={removeAlias}><Link2Off class="h-4 w-4" /></button>
			{:else}
				<TokenAliasDialog bind:token activeThemeId={$activeThemeStore.id} />
			{/if}
		</div>
	</Table.Cell>
	<Table.Cell class="w-full">
		<slot />
	</Table.Cell>
</Table.Row>
