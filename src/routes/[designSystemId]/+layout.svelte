<script lang="ts">
	import TokenGroupsExplorer from '$lib/features/token-groups-tree/ui/TokenGroupsExplorer.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import { getContext, onMount } from 'svelte'
	import { page } from '$app/stores'
	import { Home, SquareEqual } from 'lucide-svelte'
	import Button from '$lib/components/ui/button/button.svelte'

	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	let loading = true
	let activeDesignSystemIndex: number

	onMount(() => {
		activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
			(designSystem) => designSystem.id === $page.params.designSystemId
		)

		loading = false
	})

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)
</script>

{#if loading}
	<div class="grid h-screen content-center justify-center">
		<div class="animate-pulse text-xl font-medium text-slate-200">
			<SquareEqual class="mb-1 inline-block h-7 w-7" />
			Tokenbase
		</div>
	</div>
{:else if activeDesignSystemIndex >= 0}
	<main class="grid h-full flex-1 grid-cols-[250px_1fr] overflow-hidden">
		<TokenGroupsExplorer />
		<slot />
	</main>
{:else}
	<div
		class="text-cente flex h-screen flex-col items-center justify-center gap-5"
	>
		<span class="text-2xl text-slate-500"> Design System not found</span>
		<Button href="/" class="mt-5" variant="secondary">Go back home</Button>
	</div>
{/if}
