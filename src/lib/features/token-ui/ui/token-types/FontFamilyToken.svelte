<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'font-family'>
</script>

<div>{token.value}</div>
