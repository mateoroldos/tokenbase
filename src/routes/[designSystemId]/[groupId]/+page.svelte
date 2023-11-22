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
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'

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

	// When the user changes a color hue, chroma or tone individually, we update by the same value all the selected color tokens
	const handleColorChange = (e: CustomEvent, token: IToken) => {
		if (
			$selectedTokensStore !== null &&
			$selectedTokensStore.length > 1 &&
			$selectedTokensStore.includes(token.id)
		) {
			const colorTokensToChange = $groupsStore[
				$activeGroupIndex
			]?.tokens.filter(
				(tkn) =>
					tkn.id !== token.id &&
					token.type === 'color' &&
					$selectedTokensStore.includes(tkn.id)
			)

			if (colorTokensToChange) {
				for (let index = 0; index < colorTokensToChange.length; index++) {
					;(colorTokensToChange[index] as IToken<'color'>).value[
						activeTheme.id
					][e.detail.valueChanged] =
						(colorTokensToChange[index] as IToken<'color'>).value[
							activeTheme.id
						][e.detail.valueChanged] + e.detail.value
				}
			}
		}
	}

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
							on:colorChange={(e) => handleColorChange(e, token)}
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
