<script lang="ts">
	import { Link2, Link2Off } from 'lucide-svelte'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
	import TokenToolAliasButton from './token-alias-tool-button/TokenToolAliasButton.svelte'

	const handleTurnOffAliasMode = () => {
		$aliasMode = false
	}
</script>

<TokenToolAliasButton on:click={handleTurnOffAliasMode} state="lookingForAlias">
	<Link2 class="h-4 w-4 group-hover:hidden" />
	<Link2Off class="hidden h-4 w-4 group-hover:block" />
</TokenToolAliasButton>
