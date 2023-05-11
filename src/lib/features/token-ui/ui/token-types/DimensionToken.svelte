<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface';

	export let token: Token<'dimension'>;
</script>

<div>{token.value}</div>
