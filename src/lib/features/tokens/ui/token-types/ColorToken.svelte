<script lang="ts">
	import type { IToken } from '$lib/types/token-interface';

	export let token: IToken<'color'>;
</script>

<span bind:innerText={token.value} contenteditable="true" />
<div class="color-box" style={`background-color: ${token.value}`} />

<style type="scss">
	.color-box {
		width: 20px;
		height: 20px;
	}
</style>
