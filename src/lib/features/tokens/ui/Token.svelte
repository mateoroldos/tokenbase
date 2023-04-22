<script lang="ts">
	import type { IToken } from '$lib/types/token-interface';
	import BaseToken from './base-token/BaseToken.svelte';
	import ColorToken from './token-types/ColorToken.svelte';
	import DimensionToken from './token-types/DimensionToken.svelte';
	import FontFamilyToken from './token-types/FontFamilyToken.svelte';

	export let token: IToken;
</script>

<BaseToken bind:token>
	{#if token.type === 'color'}
		<ColorToken bind:token />
	{:else if token.type === 'font-family'}
		<FontFamilyToken bind:token />
	{:else if token.type === 'dimension'}
		<DimensionToken bind:token />
	{/if}
</BaseToken>
