<script lang="ts">
	import { Link2, Link2Off } from 'lucide-svelte'
	import { deleteTokenAlias } from '$lib/features/aliases/functions/deleteTokenAlias'
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'

	export let token: IToken
	export let activeThemeId: string

	const handleRemoveAlias = () => {
		let newToken = deleteTokenAlias(token, activeThemeId)

		token = newToken
	}
</script>

<button on:click={() => handleRemoveAlias()} class="group transition-colors">
	<Link2Off class="hidden h-4 text-red-600 group-hover:flex" />
	<Link2 class="flex h-4 text-purple-600 group-hover:hidden" />
</button>
