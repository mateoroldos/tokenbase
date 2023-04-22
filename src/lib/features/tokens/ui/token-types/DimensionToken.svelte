<script lang="ts">
	import type { IToken } from '$lib/types/token-interface';

	export let token: IToken<'dimension'>;
</script>

<div>{token.value}</div>
