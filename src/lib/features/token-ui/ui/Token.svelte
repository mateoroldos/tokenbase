<script lang="ts">
	import {
		checkIfValueIsAlias,
		type AliasValue
	} from '$lib/features/aliases/utils/checkIfValueIsAlias'
	import type {
		IToken,
		TokenValue,
		TokenValueWithNoAlias
	} from '$lib/features/token-groups-store/types/token.interface'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken/ColorToken.svelte'
	import CubicBezierToken from './token-types/CubicBezierToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
	import NumberToken from './token-types/NumberToken.svelte'
	import FontWeight from './token-types/FontWeight.svelte'
	import { getContext } from 'svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import { resolveAliasIdToAliasValueAndType } from '$lib/features/aliases/utils/resolveAliasIdToAliasValueAndType'

	export let token: IToken
	export let draggedTokenId: string | null
	export let activeThemeId: string

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	$: activeTokenValue = token.value[activeThemeId] as TokenValue | AliasValue
	$: isAlias = checkIfValueIsAlias(activeTokenValue)

	$: resolvedTokenValue = isAlias
		? resolveAlias()
		: (activeTokenValue as TokenValueWithNoAlias<typeof token.value>)

	const resolveAlias = () => {
		const { value, type } = resolveAliasIdToAliasValueAndType(
			(activeTokenValue as AliasValue).tokenId,
			(activeTokenValue as AliasValue).groupId,
			$designTokensGroupStore,
			activeThemeId
		)

		return value as TokenValueWithNoAlias<typeof token.value>
	}
</script>

<BaseToken
	bind:token
	bind:draggedTokenId
	on:dragstart
	on:dragenter
	on:dragend
	{isAlias}
>
	{#if token.type === 'color' && resolvedTokenValue && Array.isArray(resolvedTokenValue)}
		<ColorToken
			bind:tokenValue={resolvedTokenValue}
			bind:tokenId={token.id}
			{isAlias}
			on:colorChange
		/>
	{:else if token.type === 'fontFamily' && resolvedTokenValue}
		<FontFamilyToken bind:tokenValue={resolvedTokenValue} {isAlias} />
	{:else if token.type === 'dimension' && resolvedTokenValue}
		<DimensionToken bind:tokenValue={resolvedTokenValue} {isAlias} />
	{:else if token.type === 'duration' && resolvedTokenValue}
		<DurationToken bind:tokenValue={resolvedTokenValue} {isAlias} />
	{:else if token.type === 'number' && resolvedTokenValue}
		<NumberToken bind:tokenValue={resolvedTokenValue} {isAlias} />
	{:else if token.type === 'fontWeight' && resolvedTokenValue}
		<FontWeight bind:tokenValue={resolvedTokenValue} />
	{:else if token.type === 'cubicBezier' && resolvedTokenValue}
		<CubicBezierToken bind:tokenValue={resolvedTokenValue} {isAlias} />
	{/if}
</BaseToken>
