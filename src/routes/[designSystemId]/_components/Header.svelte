<script lang="ts">
	import ThemeSelector from '$lib/features/themes/components/ThemeSelector.svelte'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import DesignSystemBreadcrumb from './Breadcrumbs/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumb from './Breadcrumbs/GroupBreadcrumb.svelte'
	import { getContext } from 'svelte'
	import { Plus, X } from 'lucide-svelte'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import { preview } from '$lib/features/viewMode/stores/preview'
	import { viewMode } from '$lib/features/viewMode/stores/viewMode'
	import ImportDesignSystem from '$lib/features/toolbar/tools/import-design-system/ImportDesignSystem.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore.js'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface.js'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'

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
			{#if !$preview}
				<Button
					on:click={handleAddToken}
					class="h-fit px-2 py-1 text-xs"
					disabled={$viewMode}
				>
					<Plus class="mr-2 h-4 w-4" />
					Add Token
				</Button>
			{/if}
		</div>
	{/if}
	{#if $preview && !activeGroupId}
		<div class="flex flex-row items-center gap-6">
			<StartFromTemplateModal />
			<ImportDesignSystem />
		</div>
	{:else if $aliasMode}
		<Button
			size="sm"
			on:click={() => ($aliasMode = false)}
			class="bg-purple-700 text-xs hover:bg-purple-900"
		>
			<X class="mr-1 h-4 w-4" />
			Close Alias Mode</Button
		>
	{:else}
		<div>
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
	{/if}
</div>
