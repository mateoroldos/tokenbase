<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken/ColorToken.svelte'
	import CubicBezierToken from './token-types/CubicBezierToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
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
	{#if token.type === 'color' && Array.isArray(token.value) && token.value.length === 3}
		<ColorToken bind:token />
	{:else if token.type === 'fontFamily' && (typeof token.value === 'object' || Array.isArray(token.value))}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension' && typeof token.value === 'string'}
		<DimensionToken bind:token />
	{:else if token.type === 'duration' && typeof token.value === 'string'}
		<DurationToken bind:token />
	{:else if token.type === 'fontWeight' && typeof token.value === 'string'}
		<FontWeight bind:token />
	{:else if token.type === 'cubicBezier' && Array.isArray(token.value) && token.value.length === 4}
		<CubicBezierToken bind:token />
	{/if}
</BaseToken>
