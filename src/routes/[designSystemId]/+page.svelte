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

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as Template[]
	)
	let exportTypes: ExportFileTypes[] = []
	console.log($designTokensGroupStore.length)
</script>

<div>
	<Header />
	{#if $designTokensGroupStore.length <= 0}
		<section class="flex flex-col gap-8 p-14">
			<div class="flex flex-col gap-2">
				<h1 class="text-3xl">Get started!</h1>
				<p class="text-sm text-muted-foreground">
					Explore, create and organize your design system
				</p>
			</div>
			<div class="flex max-w-lg flex-col gap-6">
				<h3 class="font-semibold">Actions</h3>
				<StartCardTemplate
					title="Explore all templates"
					description="Choose the template that best suits to you!"
					image="/images/start-from-template.png"
				>
					<StartFromTemplateModal activeTemplateTypes={['design-system']} />
				</StartCardTemplate>
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
	{:else}
		<section class="flex flex-col gap-8 p-14">
			<div class="flex flex-col gap-2">
				<h1 class="text-3xl">Export your tokens!</h1>
				<p class="text-sm text-muted-foreground">
					Choose the export types that best suits your project
				</p>
			</div>
			<div class="flex max-w-lg flex-col gap-6">
				<h3 class="font-semibold">Export options</h3>
				<div class="grid grid-cols-3 gap-6">
					{#each EXPORT_FILE_TYPES as fileType, i}
						<Card.Root class=" bg-transparent">
							<Card.Header class="p-4">
								<Card.Title class="text-sm font-medium"
									><div class="flex flex-row gap-2">
										<Icon
											icon={fileType.icon}
											class="h-6 w-6 justify-center text-slate-500"
										/>
										<h3 class="text-slate-500">{fileType.name}</h3>
									</div></Card.Title
								>
							</Card.Header>
						</Card.Root>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</div>
