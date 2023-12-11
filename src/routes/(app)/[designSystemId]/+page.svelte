<script lang="ts">
	import Header from './_components/Header.svelte'
	import StartCardTemplate from './_components/StartCards/StartCardTemplate.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import StartFromTemplateCard from '$lib/features/templates/atoms/StartFromTemplateCard.svelte'
	import * as Card from '$lib/components/ui/card'
	import * as EmptyStatePage from './_components/EmptyStatePage'
	import StartFromJsonCard from './_components/StartFromJsonCard/StartFromJsonCard.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as TemplateWithSlug[]
	)
</script>

<div class="h-full overflow-hidden">
	<Header />
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
					<StartFromTemplateModal activeTemplateTypes={['design-system']} />
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
</div>
