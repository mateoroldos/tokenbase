<script lang="ts">
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import { getContext, onMount, setContext } from 'svelte'
	import { page } from '$app/stores'
	import { Button } from '$lib/components/ui/button'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import { derived, type Readable } from 'svelte/store'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	let loading = true

	onMount(() => {
		activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
			(designSystem) => designSystem.id === $page.params.designSystemId
		)

		loading = false
	})

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	const activeThemeStore: Readable<Theme | undefined> = derived(
		[activeThemeIndex, tokenBaseMainStore],
		([$activeThemeIndex, $tokenBaseMainStore]) => {
			return $tokenBaseMainStore[activeDesignSystemIndex]?.themes[
				$activeThemeIndex
			]
		}
	)

	const activeDesignSystemThemesStore: Readable<Theme[] | undefined> = derived(
		[tokenBaseMainStore, tokenBaseMainStore],
		([$tokenBaseMainStore]) => {
			return $tokenBaseMainStore[activeDesignSystemIndex]?.themes
		}
	)

	setContext('activeThemeStore', activeThemeStore)
	setContext('activeDesignSystemThemesStore', activeDesignSystemThemesStore)

	onMount(() => {
		$activeThemeIndex = 0
	})

	$: activeDesignSystemName = $tokenBaseMainStore[activeDesignSystemIndex]?.name
</script>

<svelte:head>
	<title>Tokenbase • {`${activeDesignSystemName}`}</title>
</svelte:head>

{#if loading}
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
