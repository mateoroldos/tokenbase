<script lang="ts">
	import Header from './_components/Header.svelte'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.designSystems.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)
</script>

<div>
	<Header />
	<!-- Create a page using shadcn components that welcomes you to a design system -->
	<!-- and gives you a quick overview of what it is and how to use it. -->
	<section class="p-12">
		<h2 class="text-2xl font-bold">
			Welcome to {$tokenBaseMainStore.designSystems[activeDesignSystemIndex]
				.name}
		</h2>
	</section>
</div>
