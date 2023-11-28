<script lang="ts">
	import { checkIfValueIsAlias } from '$lib/features/aliases/utils/checkIfValueIsAlias'
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import { getContext, onMount, setContext } from 'svelte'
	import { page } from '$app/stores'
	import { Button } from '$lib/components/ui/button'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import { derived, type Readable } from 'svelte/store'
	import type {
		DesignSystemOverview,
		Theme
	} from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import { findAllChildGroups } from '$lib/features/token-groups-store/utils/findAllChildGroups'
	import type {
		AliasValue,
		IToken,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import Toasts from '$lib/features/toast/Toasts.svelte'

	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	let loading = true

	let activeDesignSystemIndex = 0
	onMount(() => {
		$activeThemeIndex = 0

		activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
			(designSystem) => designSystem.id === $page.params.designSystemId
		)

		loading = false
	})
	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex((designSystem) => {
		return designSystem.id === $page.params.designSystemId
	})

	const activeDesignSystemStore: Readable<DesignSystemOverview | undefined> =
		derived([tokenBaseMainStore], ([$tokenBaseMainStore]) => {
			return $tokenBaseMainStore[activeDesignSystemIndex]
		})

	const activeDesignSystemThemesStore: Readable<Theme[]> = derived(
		[activeDesignSystemStore],
		([$activeDesignSystemStore]) => {
			return $activeDesignSystemStore?.themes as Theme[]
		}
	)

	const activeThemeStore: Readable<Theme> = derived(
		[activeThemeIndex, activeDesignSystemStore],
		([$activeThemeIndex, $activeDesignSystemStore]) => {
			return $activeDesignSystemStore?.themes[$activeThemeIndex] as Theme
		}
	)

	const activeDesignSystemGroupsStore: Readable<Group[]> = derived(
		[groupsStore, activeDesignSystemStore],
		([$groupsStore, $activeDesignSystemStore]) => {
			return findAllChildGroups(
				$groupsStore,
				$activeDesignSystemStore?.id as string
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

	setContext('activeDesignSystemStore', activeDesignSystemStore)
	setContext('activeThemeStore', activeThemeStore)
	setContext('activeDesignSystemThemesStore', activeDesignSystemThemesStore)
	setContext('activeDesignSystemGroupsStore', activeDesignSystemGroupsStore)
	setContext('activeDesignSystemTokensStore', activeDesignSystemTokensStore)
	setContext(
		'activeThemeAliasDependenciesStore',
		activeThemeAliasDependenciesStore
	)

	$: pageTitle = $activeDesignSystemStore?.name
</script>

<svelte:head>
	<title>Tokenbase • {`${pageTitle}`}</title>
</svelte:head>

{#if loading || activeDesignSystemIndex === undefined || $activeThemeStore === undefined}
	<div class="grid h-screen content-center justify-center">
		<div class="animate-pulse text-xl font-medium text-slate-200">
			<img
				src="/LOGO_TOKENBASE.png"
				alt="Token-base logo"
				class="mb-1 inline-block h-6 w-6"
			/>
			Tokenbase
		</div>
	</div>
{:else if activeDesignSystemIndex >= 0}
	<main class="grid h-screen grid-cols-[250px_1fr] overflow-hidden">
		<TokenGroupsExplorer />
		<slot />
	</main>
{:else}
	<div
		class="text-cente flex h-screen flex-col items-center justify-center gap-5"
	>
		<span class="text-2xl text-slate-500">Design System not found</span>
		<Button href="/" class="mt-5" variant="secondary">Go back home</Button>
	</div>
{/if}

<Toasts />