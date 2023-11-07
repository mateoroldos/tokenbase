<script lang="ts">
	import ThemeSelector from '$lib/features/themes/components/ThemeSelector.svelte'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import DesignSystemBreadcrumb from './Breadcrumbs/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumb from './Breadcrumbs/GroupBreadcrumb.svelte'
	import { getContext } from 'svelte'
	import { Plus } from 'lucide-svelte'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore.js'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface.js'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	$: themes = $tokenBaseMainStore[activeDesignSystemIndex]?.themes as Theme[]

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

		designTokensGroupStore.addToken(
			groupId,
			tokenType,
			$tokenBaseMainStore[activeDesignSystemIndex]?.themes as Theme[]
		)
	}

	$: activeGroupId = $page.params.groupId
</script>

<div
	class="border-b-1 flex flex-row items-center justify-between border-b border-solid border-b-slate-100 bg-white px-4 py-4"
>
	<div class="flex flex-row items-center gap-4">
		<DesignSystemBreadcrumb />
		{#if activeGroupId}
			<GroupBreadcrumb groupId={activeGroupId} />
		{/if}
	</div>
	{#if activeGroupId}
		<div class="flex flex-row items-center gap-7">
			{#if $page.params.designSystemId}
				<ThemeSelector {themes} designSystemId={$page.params.designSystemId} />
			{/if}
			<Toolbar />
			<Button on:click={handleAddToken} class="h-fit px-2 py-1 text-xs">
				<Plus class="mr-2 h-4 w-4" />
				Add Token
			</Button>
		</div>
	{/if}
</div>
