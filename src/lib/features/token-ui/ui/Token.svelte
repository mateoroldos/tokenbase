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
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let token: IToken
	export let selected = false
	export let draggedTokenId: string | null

	$: if (selected === true) dispatch('select', token.id)
	$: if (selected === false) dispatch('unselect', token.id)
</script>

<BaseToken
	bind:token
	bind:selected
	bind:draggedTokenId
	on:dragstart
	on:dragenter
	on:dragend
>
	{#if token.type === 'color'}
		<ColorToken bind:token />
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
