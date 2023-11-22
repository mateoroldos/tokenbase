<script lang="ts">
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import StartFromTemplateCard from '$lib/features/templates/atoms/StartFromTemplateCard.svelte'
	import { preview } from '$lib/features/view-mode/stores/preview'
	import { onMount } from 'svelte'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'
	import * as EmptyStatePage from './'
	import StartCardTemplate from '../../../routes/[designSystemId]/_components/StartCards/StartCardTemplate.svelte'
	import StartFromJsonCard from '../../../routes/[designSystemId]/_components/StartFromJsonCard/StartFromJsonCard.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as TemplateWithSlug[]
	)

	$: {
		if ($preview) {
			viewMode.set(true)
		} else {
			viewMode.set(false)
		}
	}

	onMount(() => {
		preview.set(false)
	})
</script>

<EmptyStatePage.Root>
	<EmptyStatePage.Section>
		<EmptyStatePage.Heading>Get Started!</EmptyStatePage.Heading>
		<EmptyStatePage.Description
			>Explore, create and organize your design system.</EmptyStatePage.Description
		>
	</EmptyStatePage.Section>
	<EmptyStatePage.Section>
		<EmptyStatePage.SectionHeading>Quickstarts</EmptyStatePage.SectionHeading>
		<div class="grid grid-cols-[2fr_3fr] gap-6">
			<StartCardTemplate
				title="Design System templates"
				content="Explore our curated list of templates to get started with your Design System."
			>
				<!-- <StartFromTemplateModal activeTemplateTypes={['design-system']} /> -->
			</StartCardTemplate>
			<StartFromJsonCard />
		</div>
	</EmptyStatePage.Section>
	<EmptyStatePage.Section>
		<EmptyStatePage.SectionHeading
			>Popular templates</EmptyStatePage.SectionHeading
		>
		<div class="grid grid-cols-3 gap-6 pb-8">
			{#await getDesignSystemTemplates}
				<span>Getting templates...</span>
			{:then templates}
				{#each templates as template}
					{#if template.type === 'design-system'}
						<StartFromTemplateCard templateOverview={template} />
					{/if}
				{/each}
			{/await}
		</div>
	</EmptyStatePage.Section>
</EmptyStatePage.Root>
