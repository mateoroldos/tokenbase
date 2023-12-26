<script lang="ts">
	import * as EmptyStatePage from './'
	import StartFromJsonCard from '../../../routes/(app)/workspace/[designSystemId]/_components/start-cards/StartFromJsonCard.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import Button from '../ui/button/Button.svelte'
	import { Plus } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { v4 as uuidv4 } from 'uuid'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import StartFromTemplateCard from '../../../routes/(app)/workspace/[designSystemId]/_components/start-cards/StartFromTemplateCard.svelte'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	export let activeDesignSystemThemes: Theme[]
	export let designSystemId: string

	$: activeDesignSystem = $designSystemsOverviewsStore.find(
		(theme) => theme.id === designSystemId
	)

	const handleAddNewGroup = () => {
		const id = uuidv4()

		groupsStore.addGroup('', designSystemId, id)

		goto(`/workspace/${designSystemId}/${id}`)
	}
</script>

<EmptyStatePage.Root>
	<EmptyStatePage.Section>
		<EmptyStatePage.Heading
			>{activeDesignSystem.name}
			<span class="text-slate-300 font-normal"> Design System </span>
		</EmptyStatePage.Heading>
	</EmptyStatePage.Section>
	{#if !$viewMode}
		<EmptyStatePage.Section>
			<EmptyStatePage.SectionHeading
				>Create an empty group</EmptyStatePage.SectionHeading
			>
			<Button on:click={handleAddNewGroup} size="sm">
				<Plus class="mr-2 w-4" />
				Create group
			</Button>
		</EmptyStatePage.Section>
		<EmptyStatePage.Section>
			<EmptyStatePage.SectionHeading
				>Or import a template</EmptyStatePage.SectionHeading
			>
			<div class="grid grid-cols-[1fr_1fr] gap-6">
				<div class="h-full">
					<StartFromTemplateCard
						{activeDesignSystemThemes}
						groupIdToImportTemplate={designSystemId}
						title="Design System Template"
						description="Explore our curated list of Design Systems."
						isDesignSystemRoot={true}
						activeTemplateType="groups"
					/>
				</div>
				<div class="h-full">
					<StartFromJsonCard />
				</div>
			</div>
		</EmptyStatePage.Section>
	{/if}
</EmptyStatePage.Root>
