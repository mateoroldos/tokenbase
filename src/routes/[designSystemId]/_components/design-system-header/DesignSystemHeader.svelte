<script lang="ts">
	import GroupHeaderBreadcrumbs from '$lib/components/breadcrumbs/design-system-header-breadcrumbs/DesignSystemHeaderBreadcrumbs.svelte'
	import ThemeSelector from '$lib/features/themes/components/ThemeSelector.svelte'
	import { Button } from '$lib/components/ui/button'
	import { Plus } from 'lucide-svelte'
	import { preview } from '$lib/features/view-mode/stores/preview'
	import ImportDesignSystem from '$lib/features/toolbar/tools/import-design-system/ImportDesignSystem.svelte'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface.js'
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import GroupHeaderContainer from './atoms/GroupHeaderContainer.svelte'
	import GroupHeaderToolsContainer from './atoms/GroupHeaderToolsContainer.svelte'
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import CloseAliasModeButton from '$lib/features/aliases/components/close-alias-mode-button/CloseAliasModeButton.svelte'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'

	export let activeDesignSystemIndex: number
	$: activeDesignSystem = $designSystemsOverviewsStore[
		activeDesignSystemIndex
	] as DesignSystemOverview

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
	$: activeGroup = $activeGroupIndex
		? ($groupsStore[$activeGroupIndex] as Group)
		: undefined

	const handleAddToken = (group: Group) => {
		const tokenType: TokenType =
			group.type !== undefined
				? group.type
				: group.tokens[group.tokens.length - 1] != undefined
				  ? group.tokens[group.tokens.length - 1]!.type
				  : 'color'

		groupsStore.addToken(group.id, tokenType, activeDesignSystem.themes)
	}
</script>

<GroupHeaderContainer>
	<GroupHeaderBreadcrumbs
		activeGroupIndex={$activeGroupIndex}
		{activeDesignSystemIndex}
		activeDesignSystemOverview={activeDesignSystem}
		{groupsStore}
		viewMode={$viewMode}
	/>
	{#if $preview}
		<GroupHeaderToolsContainer>
			<!-- <StartFromTemplateModal /> -->
			<ImportDesignSystem />
		</GroupHeaderToolsContainer>
	{/if}
</GroupHeaderContainer>
