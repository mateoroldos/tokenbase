<script lang="ts">
	import GroupHeaderBreadcrumbs from './breadcrumbs/GroupHeaderBreadcrumbs.svelte'
	import ThemeSelector from '$lib/features/themes/components/ThemeSelector.svelte'
	import { Button } from '$lib/components/ui/button'
	import { Plus } from 'lucide-svelte'
	import { preview } from '$lib/features/viewMode/stores/preview'
	import ImportDesignSystem from '$lib/features/toolbar/tools/import-design-system/ImportDesignSystem.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface.js'
	import type {
		DesignSystemOverview,
		Theme
	} from '$lib/features/token-groups-store/types/design-system-overview.interface'
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

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)
	$: activeDesignSystem = $designSystemsOverviewsStore[
		$activeDesignSystemIndex
	] as DesignSystemOverview

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
	$: activeGroup = $groupsStore[$activeGroupIndex] as Group

	const handleAddToken = () => {
		const tokenType: TokenType =
			activeGroup.type !== undefined
				? activeGroup.type
				: activeGroup.tokens[activeGroup.tokens.length - 1] != undefined
				? activeGroup.tokens[activeGroup.tokens.length - 1]!.type
				: 'color'

		groupsStore.addToken(activeGroup.id, tokenType, activeDesignSystem.themes)
	}
</script>

<GroupHeaderContainer>
	<GroupHeaderBreadcrumbs />
	{#if $preview}
		<GroupHeaderToolsContainer>
			<!-- <StartFromTemplateModal /> -->
			<ImportDesignSystem />
		</GroupHeaderToolsContainer>
	{:else if $aliasMode}
		<CloseAliasModeButton />
	{:else}
		<GroupHeaderToolsContainer>
			<Toolbar />
			<ThemeSelector
				bind:themes={activeDesignSystem.themes}
				designSystemId={activeDesignSystem.id}
			/>
			<Button on:click={handleAddToken} class="text-xs" size="sm">
				<Plus class="mr-2 h-4 w-4" />
				Add Token
			</Button>
		</GroupHeaderToolsContainer>
	{/if}
</GroupHeaderContainer>
