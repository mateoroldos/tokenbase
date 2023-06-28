<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { page } from '$app/stores'
	import DesignSystemBreadcrumb from './Breadcrumbs/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumb from './Breadcrumbs/GroupBreadcrumb.svelte'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { getContext } from 'svelte'
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import { Plus } from 'lucide-svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	const handleAddToken = () => {
		const tokenType: TokenType =
			$designTokensGroupStore[groupIndex]!.type !== undefined
				? $designTokensGroupStore[groupIndex]!.type!
				: $designTokensGroupStore[groupIndex]!.tokens[
						$designTokensGroupStore[groupIndex]!.tokens.length - 1
				  ] != undefined
				? $designTokensGroupStore[groupIndex]!.tokens[
						$designTokensGroupStore[groupIndex]!.tokens.length - 1
				  ]!.type
				: 'color'

		designTokensGroupStore.addToken(groupId, tokenType)
	}

	$: activeGroupId = $page.params.groupId
</script>

<div
	class="border-b-1 flex flex-row items-center justify-between border-b border-solid px-8 py-3"
>
	<div class="flex flex-row items-center gap-3">
		<DesignSystemBreadcrumb />
		{#if activeGroupId}
			<GroupBreadcrumb groupId={activeGroupId} />
		{/if}
	</div>
	{#if activeGroupId}
		<Button on:click={handleAddToken}>
			<Plus class="mr-2 h-4 w-4" />
			Add Token
		</Button>
	{/if}
</div>
