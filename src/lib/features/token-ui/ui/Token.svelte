<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'
	import BaseToken from './base-token/BaseToken.svelte'
	import ColorToken from './token-types/ColorToken.svelte'
	import DimensionToken from './token-types/DimensionToken.svelte'
	import DurationToken from './token-types/DurationToken.svelte'
	import FontFamilyToken from './token-types/FontFamilyToken.svelte'
	import FontWeight from './token-types/FontWeight.svelte'

	export let token: Token
</script>

<BaseToken bind:token>
	{#if token.type === 'color'}
		<ColorToken bind:token />
	{:else if token.type === 'font-family'}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension'}
		<DimensionToken bind:token />
	{:else if token.type === 'duration'}
		<DurationToken bind:token />
	{:else if token.type === 'fontWeight'}
		<FontWeight bind:token />
	{/if}
</BaseToken>
