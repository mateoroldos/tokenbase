<script lang="ts">
	import { getContext } from 'svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken/ColorToken.svelte'
	import CubicBezierToken from './token-types/CubicBezierToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
	import NumberToken from './token-types/NumberToken.svelte'
	import FontWeight from './token-types/FontWeight.svelte'
	import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'

	import {
		checkIfValueIsAlias,
		type AliasValue
	} from '$lib/features/aliases/utils/checkIfValueIsAlias'

	import { checkIfValueIsColorToken } from '$lib/features/token-management/color/utils/checkIfValueIsColor'
	import { checkIfValueIsDimensionToken } from '$lib/features/token-management/dimension/utils/checkIfValueIsDimension'
	import { checkIfValueIsFontFamilyToken } from '$lib/features/token-management/font-family/utils/checkIfValueIsFontFamily'
	import { checkIfValueIsDurationToken } from '$lib/features/token-management/duration/utils/checkIfValueIsDuration'
	import { checkIfValueIsNumberToken } from '$lib/features/token-management/number/utils/checkIfValueIsNumber'
	import { checkIfValueIsFontWeightToken } from '$lib/features/token-management/font-weight/utils/checkIfValueIsFontWeight'
	import { checkIfValueIsCubicBezier } from '$lib/features/token-management/cubic-bezier/utils/checkIfValueIsCubicBezier'

	import type {
		IToken,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import { deepResolveAliasIds } from '$lib/features/aliases/utils/deepResolveAliasIds'
	import { checkIfTokenHasDependencies } from '$lib/features/aliases/utils/checkIfTokenHasDependencies'

	export let token: IToken
	export let draggedTokenId: string | null
	export let activeThemeId: string

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let isAlias: boolean
	let deepAliasToken: IToken | null

	$: isAlias = checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)

	$: deepAliasIds = isAlias
		? deepResolveAliasIds(
				(token.value[activeThemeId] as AliasValue).groupId,
				(token.value[activeThemeId] as AliasValue).tokenId,
				$designTokensGroupStore,
				activeThemeId
		  )
		: null

	$: deepAliasToken =
		isAlias && deepAliasIds
			? findTokenByGroupIdAndTokenId(
					deepAliasIds.groupId,
					deepAliasIds.tokenId,
					$designTokensGroupStore
			  )
			: null

	$: dynamicToken = isAlias ? deepAliasToken : token

	$: if (checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)) {
		isAlias = true
		reassignTokenType()
	} else {
		isAlias = false
	}

	const reassignTokenType = () => {
		if (deepAliasToken) token.type = deepAliasToken.type
	}
</script>

<BaseToken
	bind:token
	bind:draggedTokenId
	on:dragstart
	on:dragenter
	on:dragend
	{isAlias}
	{activeThemeId}
>
	{#if dynamicToken}
		{#if token.type === 'color' && checkIfValueIsColorToken(dynamicToken.value[activeThemeId])}
			<ColorToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				on:colorChange
				{isAlias}
				tokenId={token.id}
			/>
		{:else if token.type === 'dimension' && checkIfValueIsDimensionToken(dynamicToken.value[activeThemeId])}
			<DimensionToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{:else if token.type === 'fontFamily' && checkIfValueIsFontFamilyToken(dynamicToken.value[activeThemeId])}
			<FontFamilyToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{:else if token.type === 'duration' && checkIfValueIsDurationToken(dynamicToken.value[activeThemeId])}
			<DurationToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{:else if token.type === 'number' && checkIfValueIsNumberToken(dynamicToken.value[activeThemeId])}
			<NumberToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{:else if token.type === 'fontWeight' && checkIfValueIsFontWeightToken(dynamicToken.value[activeThemeId])}
			<FontWeight
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{:else if token.type === 'cubicBezier' && checkIfValueIsCubicBezier(dynamicToken.value[activeThemeId])}
			<CubicBezierToken
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
			/>
		{/if}
	{/if}
</BaseToken>
