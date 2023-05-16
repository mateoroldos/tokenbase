<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken/ColorToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let token: Token
	export let selected: boolean = false

	$: if (selected === true) dispatch('select', token.id)
	$: if (selected === false) dispatch('unselect', token.id)
</script>

<BaseToken bind:token bind:selected>
	{#if token.type === 'color'}
		<ColorToken bind:token />
	{:else if token.type === 'font-family'}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension'}
		<DimensionToken bind:token />
	{:else if token.type === 'duration'}
		<DurationToken bind:token />
	{/if}
</BaseToken>
