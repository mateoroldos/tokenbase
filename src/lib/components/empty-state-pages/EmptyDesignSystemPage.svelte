<script lang="ts">
	import StartFromTemplateModal from '$lib/features/templates/components/start-from-template-modal/StartFromTemplateModal.svelte'
	import * as EmptyStatePage from './'
	import StartCardTemplate from '../../../routes/[designSystemId]/_components/StartCards/StartCardTemplate.svelte'
	import StartFromJsonCard from '../../../routes/[designSystemId]/_components/StartFromJsonCard/StartFromJsonCard.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
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
				<StartFromTemplateModal
					activeTemplateType={'groups'}
					{activeDesignSystemThemes}
					{groupIdToImportTemplate}
					isDesignSystemRoot={true}
				/>
			</StartCardTemplate>
			<StartFromJsonCard />
		</div>
	</EmptyStatePage.Section>
</EmptyStatePage.Root>
