<script lang="ts">
	import { buttonVariants } from '$components/ui/button'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import type { Template } from '$lib/features/templates/templates/template-interface'
	import { BookCopy } from 'lucide-svelte'
	import StartFromTemplateCard from './atoms/StartFromTemplateCard.svelte'
	import Button from '$components/ui/button/Button.svelte'

	const getDesignSystemTemplates = fetch(`/api/basic-templates`).then(
		async (data) => (await data.json()) as Template[]
	)
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Select a template
	</DialogTrigger>
	<DialogContent class="min-w-[95%]">
		<DialogHeader>
			<DialogTitle>Design System templates</DialogTitle>
		</DialogHeader>
		{#await getDesignSystemTemplates}
			<span>Getting templates...</span>
		{:then templates}
			<div class="flex flex-row flex-wrap gap-4">
				{#each templates as template}
					<StartFromTemplateCard templateOverview={template} />
				{/each}
			</div>
		{/await}
	</DialogContent>
</Dialog>
