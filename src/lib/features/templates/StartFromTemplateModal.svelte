<script lang="ts">
	import {
		TEMPLATE_TYPES_DETAILS,
		type TemplateType
	} from './types/template-type.type'
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { Template } from '$lib/features/templates/types/template-interface'
	import StartFromTemplateCard from './atoms/StartFromTemplateCard.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import { TEMPLATE_TYPES } from './types/template-type.type'
	import {
		TEMPLATE_TAGS,
		TEMPLATE_TAGS_DETAILS,
		type TemplateTag
	} from './types/template-tag.type.js'
	import Toggle from '$lib/components/ui/toggle/toggle.svelte'

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
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}
		>Templates explorer</Dialog.Trigger
	>
	<Dialog.Content class="h-[85vh] min-w-[85vw] overflow-hidden p-0">
		<!-- <Dialog.Header> -->
		<!-- <Dialog.Title class="text-md mb-5">Templates explorer</Dialog.Title> -->
		<!-- </Dialog.Header> -->

		<div class="grid grid-cols-[1fr_4fr] gap-16">
			<aside class="align-start flex flex-col gap-5 bg-gray-50 px-8 py-12">
				<Input placeholder="Search templates..." class="text-x h-8 p-2" />
				<div class="align-start flex flex-col gap-1">
					<span class="mb-1 text-xs font-medium text-gray-400"
						>Template types</span
					>
					{#each TEMPLATE_TYPES as templateType}
						<Toggle
							size="sm"
							class="justify-start"
							pressed={activeTemplateTypes.includes(templateType)}
							on:m-click={() => handleToggleTemplateType(templateType)}
						>
							{`${TEMPLATE_TYPES_DETAILS[templateType].icon} ${TEMPLATE_TYPES_DETAILS[templateType].name}`}
						</Toggle>
					{/each}
				</div>
				<div class="align-start flex flex-col gap-1">
					<span class="mb-1 text-xs font-medium text-gray-400"
						>Template tags</span
					>
					{#each TEMPLATE_TAGS as templateTag}
						<Toggle
							size="sm"
							class="justify-start"
							pressed={activeTemplateTags.includes(templateTag)}
							on:m-click={() => handleToggleTemplateTag(templateTag)}
						>
							{`${TEMPLATE_TAGS_DETAILS[templateTag].icon} ${TEMPLATE_TAGS_DETAILS[templateTag].name}`}
						</Toggle>
					{/each}
				</div>
			</aside>
			<div
				class="flex h-[100px] flex-row flex-wrap gap-8 overflow-y-auto border border-red-600 py-12 pl-0 pr-10"
			>
				{#await getDesignSystemTemplates}
					<span>Getting templates...</span>
				{:then templates}
					{#if templates.length > 0}
						{#each templates as template}
							{#if activeTemplateTypes.includes(template.type) || activeTemplateTags.some((r) => template.tags.indexOf(r) >= 0) || (activeTemplateTypes.length === 0 && activeTemplateTags.length === 0)}
								<StartFromTemplateCard templateOverview={template} />
							{/if}
						{/each}
					{:else}
						<span class="text-gray-400"><em>No templates found</em></span>
					{/if}
				{/await}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
