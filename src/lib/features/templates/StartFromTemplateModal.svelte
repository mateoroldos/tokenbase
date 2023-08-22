<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { Template } from '$lib/features/templates/templates/template-interface'
	import { BookCopy } from 'lucide-svelte'
	import StartFromTemplateCard from './atoms/StartFromTemplateCard.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as Template[]
	)
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Select a template
	</Dialog.Trigger>
	<Dialog.Content class="min-w-[95%]">
		<Dialog.Header>
			<Dialog.Title>Design System templates</Dialog.Title>
		</Dialog.Header>
		{#await getDesignSystemTemplates}
			<span>Getting templates...</span>
		{:then templates}
			<div class="flex flex-row flex-wrap gap-4">
				{#each templates as template}
					<StartFromTemplateCard templateOverview={template} />
				{/each}
			</div>
		{/await}
	</Dialog.Content>
</Dialog.Root>
