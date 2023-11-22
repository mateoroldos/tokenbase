<script lang="ts">
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import { findTokenByGroupIdAndTokenId } from '$lib/utils/findTokenByGroupIdAndTokenId'
	import * as Token from './index'
	import {
		checkIfValueIsAlias,
		type AliasValue
	} from '$lib/features/aliases/utils/checkIfValueIsAlias'
	import type {
		IToken,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import { deepResolveAliasIds } from '$lib/features/aliases/utils/deepResolveAliasIds'
	import type { Readable } from 'svelte/store'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface.js'
	import checkTokenType from '$lib/features/token-management/utils/checkTokenType'
	import type { SelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { PreviewStore } from '$lib/features/preview-template-modal/types/preview-store.type'

	export let token: IToken
	// export let draggedTokenId: string | null
	export let activeThemeId: string
	export let groupsStore: GroupsStore | Readable<Group[]>
	export let viewMode = false
	export let selectedTokensStore: SelectedTokensStore | null = null
	export let themes: Theme[]
	export let aliasDependencies: string[][]
	export let activeGroupId: string
	export let previewStore: PreviewStore | null = null

	let isAlias: boolean
	let deepAliasToken: IToken | null

	$: isAlias = checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)

	$: deepAliasIds = isAlias
		? deepResolveAliasIds(
				(token.value[activeThemeId] as AliasValue).groupId,
				(token.value[activeThemeId] as AliasValue).tokenId,
				$groupsStore,
				activeThemeId
		  )
		: null

	$: deepAliasToken =
		isAlias && deepAliasIds
			? findTokenByGroupIdAndTokenId(
					deepAliasIds.groupId,
					deepAliasIds.tokenId,
					$groupsStore
			  )
			: null

	$: dynamicToken = isAlias ? (deepAliasToken as IToken) : token

	$: if (checkIfValueIsAlias(token.value[activeThemeId] as TokenValue)) {
		isAlias = true
		reassignTokenType()
	} else {
		isAlias = false
	}

	const reassignTokenType = () => {
		if (deepAliasToken) token.type = deepAliasToken.type
	}

	$: isTokenValueValid = checkTokenType(
		dynamicToken.value[activeThemeId],
		token.type
	)
</script>

<Token.Base
	bind:token
	on:dragstart
	on:dragenter
	on:dragend
	{previewStore}
	{isAlias}
	{activeThemeId}
	{viewMode}
	{selectedTokensStore}
	{themes}
	{aliasDependencies}
	{groupsStore}
	{activeGroupId}
>
	{#if dynamicToken && isTokenValueValid}
		{#if token.type === 'color'}
			<Token.Color
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				on:colorChange
				{isAlias}
				{viewMode}
				tokenId={token.id}
			/>
		{:else if token.type === 'dimension'}
			<Token.Dimension
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{:else if token.type === 'fontFamily'}
			<Token.FontFamily
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{:else if token.type === 'duration'}
			<Token.Duration
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{:else if token.type === 'number'}
			<Token.Number
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{:else if token.type === 'fontWeight'}
			<Token.FontWeight
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{:else if token.type === 'cubicBezier'}
			<Token.CubicBezier
				bind:tokenValue={dynamicToken.value[activeThemeId]}
				{isAlias}
				{viewMode}
			/>
		{/if}
	{/if}
</Token.Base>
