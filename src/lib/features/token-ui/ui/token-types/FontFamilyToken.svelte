<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface';

	export let token: Token<'font-family'>;
</script>

<div>{token.value}</div>
