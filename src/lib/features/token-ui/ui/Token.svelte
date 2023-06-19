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
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { getContext } from 'svelte'
	import findTokenById from '$lib/utils/findTokenById'

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	// Function to remove the token.alias property
	const removeAlias = () => {
		token = JSON.parse(JSON.stringify(token))
		token.alias = undefined
	}

	$: if (token.alias && token.alias !== undefined) {
		token = {
			...token,
			type: findTokenById(token.alias.tokenId, $designTokensGroupStore)?.type,
			value: findTokenById(token.alias.tokenId, $designTokensGroupStore)?.value
		}
	}
</script>

<BaseToken bind:token bind:draggedTokenId on:dragstart on:dragenter on:dragend>
	{#if token.alias}
		<button on:click={removeAlias}>Remove Alias</button>
	{/if}
	{#if token.type === 'color' && Array.isArray(token.value) && token.value.length === 3}
		<ColorToken bind:token on:colorChange />
	{:else if token.type === 'fontFamily' && Array.isArray(token.value)}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension' && typeof token.value === 'object'}
		<DimensionToken bind:token />
	{:else if token.type === 'duration' && typeof token.value === 'number'}
		<DurationToken bind:token />
	{:else if token.type === 'number' && typeof token.value === 'number'}
		<NumberToken bind:token />
	{:else if (token.type === 'fontWeight' && typeof token.value === 'string') || typeof token.value === 'number'}
		<FontWeight bind:token />
	{:else if token.type === 'cubicBezier' && Array.isArray(token.value) && token.value.length === 4}
		<CubicBezierToken bind:token />
	{/if}
</BaseToken>
