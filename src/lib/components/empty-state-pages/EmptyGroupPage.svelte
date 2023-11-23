<script lang="ts">
	import StartFromTemplateModal from '$lib/features/templates/components/template-modal/StartFromTemplateModal.svelte'
	import StartCardTemplate from '../../../routes/[designSystemId]/_components/StartCards/StartCardTemplate.svelte'
	import StartFromJsonCard from '../../../routes/[designSystemId]/_components/StartFromJsonCard/StartFromJsonCard.svelte'
	import * as EmptyStatePage from './'
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
				<StartFromTemplateModal activeTemplateTypes={['group']} />
			</StartCardTemplate>
			<StartFromJsonCard />
		</div>
	</EmptyStatePage.Section>
</EmptyStatePage.Root>
