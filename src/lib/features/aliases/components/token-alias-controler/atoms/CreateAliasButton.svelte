<script lang="ts">
	import { Link2 } from 'lucide-svelte'
	import TokenToolAliasButton from './token-alias-tool-button/TokenToolAliasButton.svelte'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	export let groupsStore: GroupsStore
	export let activeGroupId: string
	export let tokenId: string
	export let activeThemeId: string

	const handleCreateTokenAlias = () => {
		if ($aliasMode) {
			groupsStore.createAlias(
				$aliasMode.groupId,
				$aliasMode.tokenId,
				activeGroupId,
				tokenId,
				activeThemeId
			)

			goto(`/workspace/${$page.params.designSystemId}/${$aliasMode.groupId}`)

			$aliasMode = false
		}
	}
</script>

<TokenToolAliasButton on:click={handleCreateTokenAlias} state="receivingAlias">
	<Link2 class="h-4 w-4" />
</TokenToolAliasButton>
