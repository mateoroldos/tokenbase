<script lang="ts">
	import {
		TEMPLATE_TYPES_DETAILS,
		type TemplateType
	} from './types/template-type.type'
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { Template } from '$lib/features/templates/types/template-interface'
	import StartFromTemplateCard from './atoms/StartFromTemplateCard.svelte'
	import { TEMPLATE_TYPES } from './types/template-type.type'
	import {
		TEMPLATE_TAGS,
		TEMPLATE_TAGS_DETAILS,
		type TemplateTag
	} from './types/template-tag.type.js'
	import Toggle from '$lib/components/ui/toggle/toggle.svelte'
	import StartFromTokenCard from './atoms/StartFromTokenCard.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as Template[]
	)

	export let activeTemplateTypes: TemplateType[] = []
	export let activeTemplateTags: TemplateTag[] = []

	const handleToggleTemplateType = (templateType: TemplateType) => {
		if (activeTemplateTypes.includes(templateType)) {
			activeTemplateTypes = activeTemplateTypes.filter(
				(activeTemplateType) => activeTemplateType !== templateType
			)
		} else {
			activeTemplateTypes = [...activeTemplateTypes, templateType]
		}
	}

	const handleToggleTemplateTag = (templateTag: TemplateTag) => {
		if (activeTemplateTags.includes(templateTag)) {
			activeTemplateTags = activeTemplateTags.filter(
				(activeTemplateTag) => activeTemplateTag !== templateTag
			)
		} else {
			activeTemplateTags = [...activeTemplateTags, templateTag]
		}
	}

	let open: boolean
	const closeModal = () => {
		open = false
	}
</script>

<Dialog.Root bind:open portal="yes">
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}
		>Explore Templates</Dialog.Trigger
	>
	<Dialog.Portal>
		<Dialog.Content class="h-[85vh] min-w-[85vw] overflow-hidden p-0">
			<div class="grid grid-cols-[1fr_3fr] gap-16 overflow-hidden">
				<aside class="align-start flex flex-col gap-7 bg-slate-50 px-8 py-12">
					<h3 class="mb-2 font-medium">Template Explorer</h3>
					<div class="align-start flex flex-col gap-1">
						<span class="mb-1 text-xs font-medium text-slate-400">Types</span>
						{#each TEMPLATE_TYPES as templateType}
							<Toggle
								size="sm"
								class="justify-start text-slate-400"
								pressed={activeTemplateTypes.includes(templateType)}
								on:m-click={() => handleToggleTemplateType(templateType)}
							>
								{`${TEMPLATE_TYPES_DETAILS[templateType].icon} ${TEMPLATE_TYPES_DETAILS[templateType].name}`}
							</Toggle>
						{/each}
					</div>
					<div class="align-start flex flex-col gap-1">
						<span class="mb-1 text-xs font-medium text-slate-400">Tags</span>
						{#each TEMPLATE_TAGS as templateTag}
							<Toggle
								size="sm"
								class="justify-start text-slate-400"
								pressed={activeTemplateTags.includes(templateTag)}
								on:m-click={() => handleToggleTemplateTag(templateTag)}
							>
								{`${TEMPLATE_TAGS_DETAILS[templateTag].icon} ${TEMPLATE_TAGS_DETAILS[templateTag].name}`}
							</Toggle>
						{/each}
					</div>
				</aside>
				<div
					class="grid auto-rows-max grid-cols-2 gap-8 overflow-y-auto py-12 pl-0 pr-16"
				>
					{#await getDesignSystemTemplates}
						<span>Getting templates...</span>
					{:then templates}
						{#if templates.length > 0}
							{#each templates as template}
								{#if activeTemplateTypes.includes(template.type) || activeTemplateTags.some((r) => template.tags.indexOf(r) >= 0) || (activeTemplateTypes.length === 0 && activeTemplateTags.length === 0)}
									{#if template.type !== 'token'}
										<StartFromTemplateCard
											templateOverview={template}
											on:load-template={() => closeModal()}
										/>
									{:else}
										<StartFromTokenCard
											tokenTemplateOverview={template}
											on:load-template={() => closeModal()}
										/>
									{/if}
								{/if}
							{/each}
						{:else}
							<span class="text-slate-400"><em>No templates found</em></span>
						{/if}
					{/await}
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
