<script lang="ts">
	import ThemeSelector from '$lib/features/themes/components/ThemeSelector.svelte'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import DesignSystemBreadcrumb from './Breadcrumbs/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumb from './Breadcrumbs/GroupBreadcrumb.svelte'
	import { getContext } from 'svelte'
	import { Plus, X } from 'lucide-svelte'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore.js'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
 
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
	class="border-b-1 flex min-h-[70px] flex-row items-center justify-between border-b border-solid border-b-slate-100 bg-white px-4 py-4 transition-colors"
	class:bg-purple-100={$aliasMode}
	class:border-b-purple-200={$aliasMode}
>
	<div class="flex flex-row items-center gap-4">
		<DesignSystemBreadcrumb />
		{#if activeGroupId}
			<GroupBreadcrumb groupId={activeGroupId} />
		{/if}
	</div>
	{#if activeGroupId && !$aliasMode}
		<div class="flex flex-row items-center gap-5">
			<Toolbar />
			{#if $page.params.designSystemId && $tokenBaseMainStore[activeDesignSystemIndex]}
				<ThemeSelector
					bind:themes={$tokenBaseMainStore[activeDesignSystemIndex].themes}
					designSystemId={$page.params.designSystemId}
				/>
			{/if}
			<Button on:click={handleAddToken} class="text-xs" size="sm">
				<Plus class="mr-2 h-4 w-4" />
				Add Token
			</Button>
		</div>
	{:else}
		<Button
			size="sm"
			on:click={() => ($aliasMode = false)}
			class="bg-purple-700 text-xs hover:bg-purple-900"
		>
			<X class="mr-1 h-4 w-4" />
			Close Alias Mode</Button
		>
	{/if}
</div>
