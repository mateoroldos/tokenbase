<script lang="ts">
	import Header from './_components/Header.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'
	import StartCardTemplate from './_components/StartCards/StartCardTemplate.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import StartFromJsonModal from '$lib/features/templates/StartFromJsonModal.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: hasGroups = $designTokensGroupStore.find(
		(group) => group.parentGroup === $page.params.designSystemId
	)

	const startCards = [
		{
			title: 'Start from a template',
			description:
				'Start from a template to get a head start on your design system.',
			image: '/images/start-from-template.png',
			component: StartFromTemplateModal
		},
		{
			title: 'Create a group',
			description: 'Start from scratch to create your own design system',
			image: '/images/start-from-scratch.png',
			link: `/design-systems/${$page.params.designSystemId}/start-from-scratch`,
			linkText: 'Start from scratch'
		},
		{
			title: 'Import your JSON file',
			description: 'Import your design system from a JSON file',
			image: '/images/import-from-json.png',
			link: `/design-systems/${$page.params.designSystemId}/import-from-json`,
			linkText: 'Import from JSON',
			component: StartFromJsonModal
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
	<section class="p-36">
		<h2 class="text-3xl font-medium">
			{`${$tokenBaseMainStore[activeDesignSystemIndex].name}`}
		</h2>
		<span class="text-gray-500">Design System</span>
		{#if hasGroups}
			has groups
		{:else}
			<div class="mt-9 grid grid-cols-2 gap-6">
				{#each startCards as { title, description, image, component }}
					<StartCardTemplate {title} {description} {image}>
						{#if component}
							<svelte:component
								this={component}
								activeTemplateTypes={['design-system']}
							/>
						{/if}
					</StartCardTemplate>
				{/each}
			</div>
		{/if}
	</section>
</div>
