<script lang="ts">
	import StartFromTemplateModal from '$lib/features/templates/components/start-from-template-modal/StartFromTemplateModal.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import StartCardTemplate from '../../../routes/[designSystemId]/_components/StartCards/StartCardTemplate.svelte'
	import StartFromJsonCard from '../../../routes/[designSystemId]/_components/StartFromJsonCard/StartFromJsonCard.svelte'
	import * as EmptyStatePage from './'

	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
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
				<StartFromTemplateModal
					activeTemplateType={'groups'}
					{activeDesignSystemThemes}
					{groupIdToImportTemplate}
				/>
			</StartCardTemplate>
			<StartFromJsonCard />
		</div>
	</EmptyStatePage.Section>
</EmptyStatePage.Root>
