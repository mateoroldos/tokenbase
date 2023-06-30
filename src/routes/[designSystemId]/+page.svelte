<script lang="ts">
	import Header from './_components/Header.svelte'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'
	import StartCardTemplate from './_components/StartCards/StartCardTemplate.svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.designSystems.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	const startCards = [
		{
			title: 'Start from a Design System template',
			description:
				'Start from a template to get a head start on your design system',
			image: '/images/start-from-template.png',
			link: `/design-systems/${$page.params.designSystemId}/start-from-template`,
			linkText: 'Start from template'
		},
		{
			title: 'Create a group',
			description: 'Start from scratch to create your own design system',
			image: '/images/start-from-scratch.png',
			link: `/design-systems/${$page.params.designSystemId}/start-from-scratch`,
			linkText: 'Start from scratch'
		},
		{
			title: 'Import your a JSON file',
			description: 'Import your design system from a JSON file',
			image: '/images/import-from-json.png',
			link: `/design-systems/${$page.params.designSystemId}/import-from-json`,
			linkText: 'Import from JSON'
		},
		{
			title: 'Import a Figma file',
			description: 'Import your design system from a Figma file',
			image: '/images/import-from-figma.png',
			link: `/design-systems/${$page.params.designSystemId}/import-from-figma`,
			linkText: 'Import from Figma'
		}
	]
</script>

<div>
	<Header />
	<section class="p-12">
		<h2 class="mb-6 text-xl font-bold">
			{`${$tokenBaseMainStore.designSystems[activeDesignSystemIndex].name}`} Design
			System
		</h2>
		<div class="grid grid-cols-2 gap-6">
			{#each startCards as { title, description, image, link, linkText }}
				<StartCardTemplate {title} {description} {image} {link} {linkText} />
			{/each}
		</div>
	</section>
</div>
