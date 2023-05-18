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

	export let token: IToken
	export let draggedTokenId: string | null
</script>

<BaseToken bind:token bind:draggedTokenId on:dragstart on:dragenter on:dragend>
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
