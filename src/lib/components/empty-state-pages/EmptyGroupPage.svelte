<script lang="ts">
	import StartFromTemplateCard from '$lib/features/templates/atoms/StartFromTemplateCard.svelte'
	import StartCardTemplate from '../../../routes/[designSystemId]/_components/StartCards/StartCardTemplate.svelte'
	import StartFromJsonCard from '../../../routes/[designSystemId]/_components/StartFromJsonCard/StartFromJsonCard.svelte'
	import * as EmptyStatePage from './'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => await data.json()
	)
</script>

<EmptyStatePage.Root>
	<EmptyStatePage.Section>
		<EmptyStatePage.Heading>Add Tokens to your group</EmptyStatePage.Heading>
		<EmptyStatePage.Description
			>You can add Tokens manualy or quickstart with a Template or JSON file.</EmptyStatePage.Description
		>
	</EmptyStatePage.Section>
	<EmptyStatePage.Section>
		<EmptyStatePage.SectionHeading>Quickstarts</EmptyStatePage.SectionHeading>
		<div class="grid grid-cols-[2fr_3fr] gap-6">
			<StartCardTemplate
				title="Explore templates"
				content="Start from the template that fits your needs"
			>
				<!-- <StartFromTemplateModal activeTemplateTypes={['group']} /> -->
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
					{#if template.type === 'group'}
						<StartFromTemplateCard templateOverview={template} />
					{/if}
				{/each}
			{/await}
		</div>
	</EmptyStatePage.Section>
</EmptyStatePage.Root>
