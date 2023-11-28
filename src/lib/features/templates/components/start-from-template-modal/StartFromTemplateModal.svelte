<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import TemplateCard from '../template-card/TemplateCard.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import StartFromTemplateModalSidebar from './sections/StartFromTemplateModalSidebar.svelte'
	import type { TemplateTag } from '../../types/template-tag.type'
	import type { TemplateType } from '../../types/template-type.type'
	import TemplateTypeDescription from './sections/TemplateTypeDescription.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as TemplateWithSlug[]
	)

	export let activeTemplateType: TemplateType = 'groups'
	export let activeTemplateTags: TemplateTag[] = []
	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let isDesignSystemRoot = false

	let open: boolean
	const closeModal = () => {
		open = false
	}
</script>

<Dialog.Root portal="yes" bind:open>
	<Dialog.Trigger class={buttonVariants({ size: 'sm' })}
		>Explore Templates</Dialog.Trigger
	>
	<Dialog.Content class="h-[90vh] min-w-[90vw] overflow-hidden p-0">
		<div class="grid grid-cols-[1fr_3fr] gap-16 overflow-hidden">
			<StartFromTemplateModalSidebar
				bind:activeTemplateType
				bind:activeTemplateTags
			/>
			<div class="flex flex-col gap-8 overflow-y-auto py-12 pl-0 pr-14">
				<TemplateTypeDescription bind:templateType={activeTemplateType} />
				<div class="grid auto-rows-max grid-cols-2 gap-8">
					{#await getDesignSystemTemplates}
						<span>Getting templates...</span>
					{:then templates}
						{#if templates.length > 0}
							{#each templates as template}
								{#if activeTemplateType.includes(template.type) || activeTemplateTags.some((r) => template.tags.indexOf(r) >= 0) || (activeTemplateType.length === 0 && activeTemplateTags.length === 0)}
									<TemplateCard
										templateOverview={template}
										{groupIdToImportTemplate}
										{activeDesignSystemThemes}
										on:importedTemplate={() => closeModal()}
										{isDesignSystemRoot}
									/>
								{/if}
							{/each}
						{:else}
							<span class="text-slate-400"><em>No templates found</em></span>
						{/if}
					{/await}
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
