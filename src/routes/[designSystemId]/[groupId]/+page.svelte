<script lang="ts">
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import TokensTable from '$lib/components/tokens-table/TokensTable.svelte'
	import { navigating, page } from '$app/stores'
	import { getContext, setContext } from 'svelte'
	import { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import GroupHeader from './_components/group-header/GroupHeader.svelte'
	import { derived, type Readable } from 'svelte/store'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import EmptyGroupPage from '$lib/components/empty-state-pages/EmptyGroupPage.svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)

	const activeGroupIndex = derived(
		[groupsStore, page],
		([$groupsStore, $page]) => {
			return $groupsStore.findIndex(
				(group) => group.id === $page.params.groupId
			)
		}
	)

	const activeThemeAliasDependencies: Readable<string[][]> = getContext(
		'activeThemeAliasDependencies'
	)

	$: activeTheme = $designSystemsOverviewsStore[$activeDesignSystemIndex]
		?.themes[$activeThemeIndex] as Theme

	const selectedTokensStore = createSelectedTokensStore()

	setContext('activeGroupIndex', activeGroupIndex)
	setContext('activeDesignSystemIndex', activeDesignSystemIndex)
	setContext('selectedTokensStore', selectedTokensStore)

	$: if ($navigating) {
		setTimeout(() => {
			selectedTokensStore.clearTokens()
		}, 1) // This is setTimeout is a workaround to make the clear tokens work.
		//If we did it at the same time as the $navigation it didn't work
	}
</script>

{#if $groupsStore[$activeGroupIndex] != undefined && $designSystemsOverviewsStore[$activeDesignSystemIndex] != undefined}
	<section class="flex h-full flex-1 flex-col overflow-hidden">
		<GroupHeader activeDesignSystemIndex={$activeDesignSystemIndex} />
		{#if $groupsStore[$activeGroupIndex].tokens.length > 0}
			<TokensTable
				{activeTheme}
				{groupsStore}
				{selectedTokensStore}
				activeGroupIndex={$activeGroupIndex}
			>
				{#if $page.params.groupId}
					{#each $groupsStore[$activeGroupIndex].tokens as token}
						<Token
							bind:token
							activeThemeId={activeTheme.id}
							{groupsStore}
							{selectedTokensStore}
							themes={$designSystemsOverviewsStore[$activeDesignSystemIndex]
								.themes}
							aliasDependencies={$activeThemeAliasDependencies}
							activeGroupId={$page.params.groupId}
						/>
					{/each}
				{/if}
			</TokensTable>
		{:else}
			<EmptyGroupPage />
		{/if}
	</section>
{:else}
	<p>Group not found</p>
{/if}
