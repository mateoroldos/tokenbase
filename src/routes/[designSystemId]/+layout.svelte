<script lang="ts">
	import DesignSystemNotFound from '$lib/components/DesignSystemNotFound.svelte'
	import LoadingLogo from '$lib/components/LoadingLogo.svelte'
	import { checkIfValueIsAlias } from '$lib/features/aliases/utils/checkIfValueIsAlias'
	import GroupsExplorer from '$lib/features/token-groups-tree/ui/GroupsExplorer.svelte'
	import { onMount, setContext } from 'svelte'
	import { page } from '$app/stores'
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import { derived, type Readable } from 'svelte/store'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import type {
		AliasValue,
		IToken,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { findAllChildGroups } from '$lib/features/token-groups-store/utils/findAllChildGroups'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	let loading = true

	onMount(() => {
		$activeThemeIndex = 0

		loading = false
	})

	const activeDesignSystemIndex = derived(
		[designSystemsOverviewsStore, page],
		([$designSystemsOverviewsStore, $page]) => {
			return $designSystemsOverviewsStore.findIndex((designSystem) => {
				return designSystem.id === $page.params.designSystemId
			})
		}
	)

	const activeDesignSystemId = derived([page], ([$page]) => {
		return $page.params.designSystemId as string
	})

	const activeThemeStore: Readable<Theme> = derived(
		[activeThemeIndex, activeDesignSystemIndex],
		([$activeThemeIndex, $activeDesignSystemIndex]) => {
			return $designSystemsOverviewsStore[$activeDesignSystemIndex]?.themes[
				$activeThemeIndex
			] as Theme
		}
	)

	const activeDesignSystemGroupsStore: Readable<Group[]> = derived(
		[groupsStore, designSystemsOverviewsStore, activeDesignSystemIndex],
		([
			$groupsStore,
			$designSystemsOverviewsStore,
			$activeDesignSystemIndex
		]) => {
			return findAllChildGroups(
				$groupsStore,
				$designSystemsOverviewsStore[$activeDesignSystemIndex]?.id as string
			)
		}
	)

	const activeDesignSystemTokensStore: Readable<IToken[]> = derived(
		[activeDesignSystemGroupsStore],
		([$activeDesignSystemGroupsStore]) => {
			return $activeDesignSystemGroupsStore.flatMap((group) => group.tokens)
		}
	)

	const activeThemeAliasDependenciesStore: Readable<string[][]> = derived(
		[activeDesignSystemTokensStore, activeThemeStore],
		([$activeDesignSystemTokensStore, $activeThemeStore]) => {
			const aliasTokens = $activeDesignSystemTokensStore.filter((token) => {
				return checkIfValueIsAlias(
					token.value[$activeThemeStore.id as string] as TokenValue
				)
			})

			if (!aliasTokens) {
				return []
			}

			return aliasTokens.map((token) => {
				const aliasValue = token.value[
					$activeThemeStore.id as string
				] as AliasValue

				return [token.id, aliasValue.tokenId]
			})
		}
	)

	setContext('activeDesignSystemIndex', activeDesignSystemIndex)
	setContext('activeDesignSystemId', activeDesignSystemId)
	setContext(
		'activeThemeAliasDependenciesStore',
		activeThemeAliasDependenciesStore
	)
</script>

<svelte:head>
	<title
		>Tokenbase • {`${$designSystemsOverviewsStore[$activeDesignSystemIndex]?.name}`}</title
	>
</svelte:head>

{#if loading || activeDesignSystemIndex === undefined || $designSystemsOverviewsStore === undefined}
	<LoadingLogo />
{:else if $activeDesignSystemIndex >= 0}
	<main class="grid h-screen grid-cols-[250px_1fr] overflow-hidden">
		<GroupsExplorer {activeDesignSystemGroupsStore} />
		<slot />
	</main>
{:else}
	<DesignSystemNotFound />
{/if}
