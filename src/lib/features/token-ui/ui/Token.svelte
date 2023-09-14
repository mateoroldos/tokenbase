<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken/ColorToken.svelte'
	import CubicBezierToken from './token-types/CubicBezierToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
	import NumberToken from './token-types/NumberToken.svelte'
	import FontWeight from './token-types/FontWeight.svelte'
	import { getContext } from 'svelte'
	import findTokenById from '$lib/utils/findTokenById'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	// This function gets the alias value and type and assigns it to the token
	const connectTokenToAliasValues = () => {
		if (token.alias) {
			const aliasOriginToken = findTokenById(
				token.alias.tokenId,
				$designTokensGroupStore
			)

			if (aliasOriginToken) {
				token = {
					...token,
					type: aliasOriginToken.type,
					value: aliasOriginToken.value
				}
			}
		}
	}

	$: if (token.alias !== undefined) {
		connectTokenToAliasValues()
	}
</script>

<BaseToken bind:token bind:draggedTokenId on:dragstart on:dragenter on:dragend>
	{#if token.type === 'color'}
		<ColorToken bind:token on:colorChange />
	{:else if token.type === 'fontFamily'}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension'}
		<DimensionToken bind:token />
	{:else if token.type === 'duration'}
		<DurationToken bind:token />
	{:else if token.type === 'number'}
		<NumberToken bind:token />
	{:else if token.type === 'fontWeight'}
		<FontWeight bind:token />
	{:else if token.type === 'cubicBezier'}
		<CubicBezierToken bind:token />
	{/if}
</BaseToken>
