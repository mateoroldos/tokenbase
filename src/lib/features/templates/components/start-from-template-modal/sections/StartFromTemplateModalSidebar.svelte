<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import Toggle from '$lib/components/ui/toggle/toggle.svelte'
	import type { TemplateTag } from '$lib/features/templates/types/template-tag.type'
	import {
		TEMPLATE_TYPES,
		TEMPLATE_TYPES_DETAILS,
		type TemplateType
	} from '$lib/features/templates/types/template-type.type'

	export let activeTemplateType: TemplateType
	export let activeTemplateTags: TemplateTag[] = []

	const handleSelectTemplateType = (templateType: TemplateType) => {
		activeTemplateType = templateType
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

<aside
	class="align-start flex flex-col gap-7 border-r border-slate-200 bg-slate-50 px-8 py-12"
>
	<h3 class="mb-2 text-lg font-medium text-slate-800">Templates Explorer</h3>
	<div class="align-start flex flex-col gap-1">
		<span class="mb-1 ml-1 text-xs font-medium text-slate-400">Types</span>
		{#each TEMPLATE_TYPES as templateType}
			<!-- {#if templateType === activeTemplateType}
				<span
					>{`${TEMPLATE_TYPES_DETAILS[templateType].icon} ${TEMPLATE_TYPES_DETAILS[templateType].name}`}</span
				>
			{:else} -->
			<Button
				size="sm"
				variant="link"
				class="justify-start border border-transparent px-2 text-slate-500 hover:no-underline disabled:border disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-800 disabled:opacity-100"
				disabled={templateType === activeTemplateType}
				on:click={() => handleSelectTemplateType(templateType)}
			>
				{`${TEMPLATE_TYPES_DETAILS[templateType].icon} ${TEMPLATE_TYPES_DETAILS[templateType].name} Templates`}
			</Button>
			<!-- {/if} -->
		{/each}
	</div>
	<!-- <div class="align-start flex flex-col gap-1">
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
	</div> -->
</aside>
