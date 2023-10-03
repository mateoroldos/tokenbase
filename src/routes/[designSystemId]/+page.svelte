<script lang="ts">
	import Header from './_components/Header.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'
	import StartCardTemplate from './_components/StartCards/StartCardTemplate.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import type { Template } from '$lib/features/templates/types/template-interface'
	import StartFromTemplateCard from '$lib/features/templates/atoms/StartFromTemplateCard.svelte'
	import {
		type ExportFileTypes,
		EXPORT_FILE_TYPES
	} from '$lib/features/export-design-system/exportFileTypes'
	import Icon from '@iconify/svelte'
	import * as Card from '$lib/components/ui/card'
	import StartFromJsonModal from '$lib/features/templates/StartFromJsonModal.svelte'
	import { Upload } from 'lucide-svelte'
	import { Separator } from '$lib/components/ui/separator'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as Template[]
	)
</script>

<div>
	<Header />
	<section class="flex flex-col gap-8 p-14">
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl">Get started!</h1>
			<p class="text-sm text-muted-foreground">
				Explore, create and organize your design system
			</p>
		</div>
		<div class="flex max-w-lg flex-col gap-6">
			<h3 class="font-semibold">Actions</h3>
			<div class="grid grid-cols-2 gap-6">
				<StartCardTemplate
					title="Explore templates"
					description="All templates"
					content="Start from the template that fits your needs"
				>
					<StartFromTemplateModal activeTemplateTypes={['design-system']} />
				</StartCardTemplate>
				<Card.Root class="flex h-full  flex-1 flex-col">
					<Card.Header>
						<Card.Title class="text-md font-medium">Upload your file</Card.Title
						>
						<Card.Description
							class="flex flex-row items-center text-xs leading-[0] text-slate-400"
						>
							<Upload class="mr-1 h-3 w-3" />
							<span>Import files</span>
						</Card.Description>
					</Card.Header>
					<Separator class="mb-3" />
					<Card.Content>Start your project from a personal file</Card.Content>
					<Card.Footer>
						<StartFromJsonModal />
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
		<div class="flex flex-col gap-8">
			<h3 class="font-semibold">Popular templates</h3>
			<div class="grid grid-cols-4 gap-8">
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
		</div>
	</section>
</div>
