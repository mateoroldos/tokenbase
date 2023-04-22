<script lang="ts">
	import type { IToken } from '$lib/types/token-interface';

	export let token: IToken;
</script>

<div>
	<span bind:textContent={token.name} contenteditable="true" />
	<span>{token.type}</span>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4rem;
	}
</style>
