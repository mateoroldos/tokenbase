<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'color'>
</script>

<span bind:innerHTML={token.value} contenteditable="true" />
<div
	class="color-box"
	style={`background-color: ${token.value}`}
/>

<style type="scss">
	.color-box {
		width: 20px;
		height: 20px;
	}
</style>
