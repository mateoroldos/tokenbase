<script lang="ts">
	import { Link2 } from 'lucide-svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import TokenToolAliasButton from './token-alias-tool-button/TokenToolAliasButton.svelte'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'

	export let activeGroupId: string
	export let token: IToken

	const handleTurnOnAliasMode = () => {
		$aliasMode = {
			groupId: activeGroupId,
			tokenId: token.id,
			tokenType: token.type
		}
	}
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<TokenToolAliasButton on:click={handleTurnOnAliasMode}>
			<Link2 class="h-4 w-4" />
		</TokenToolAliasButton>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>Create alias</p>
	</Tooltip.Content>
</Tooltip.Root>
