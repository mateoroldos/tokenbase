<script lang="ts">
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
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import CloseAliasModeButton from '$lib/features/aliases/components/close-alias-mode-button/CloseAliasModeButton.svelte'
	import GroupHeaderToolsContainer from '../../../_components/design-system-header/atoms/GroupHeaderToolsContainer.svelte'
	import DesignSystemHeader from '../../../_components/design-system-header/DesignSystemHeader.svelte'

	export let activeDesignSystemIndex: number
	$: activeDesignSystem = $designSystemsOverviewsStore[
		activeDesignSystemIndex
	] as DesignSystemOverview
	export let activeWorkspaceId: string

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
	$: activeGroup =
		$activeGroupIndex != -1
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

<DesignSystemHeader {activeDesignSystemIndex} {activeWorkspaceId}>
	{#if $preview}
		<GroupHeaderToolsContainer>
			<ImportDesignSystem />
		</GroupHeaderToolsContainer>
	{:else if $aliasMode}
		<CloseAliasModeButton />
	{:else if $activeGroupIndex != -1 && activeGroup}
		<GroupHeaderToolsContainer>
			<Toolbar />
			<ThemeSelector
				bind:themes={activeDesignSystem.themes}
				designSystemId={activeDesignSystem.id}
			/>
			<Button
				on:click={() => handleAddToken(activeGroup)}
				class="text-xs"
				size="sm"
			>
				<Plus class="mr-2 h-4 w-4" />
				Add Token
			</Button>
		</GroupHeaderToolsContainer>
	{/if}
</DesignSystemHeader>
