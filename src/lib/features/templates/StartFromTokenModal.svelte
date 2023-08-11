<script lang="ts">
	import { buttonVariants } from '$components/ui/button'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import StartFromTokenCard from './atoms/StartFromTokenCard.svelte'

	const getSystemTokens = fetch(`/api/tokens`).then(
		async (data) => await data.json()
	)
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Select a Token
	</DialogTrigger>
	<DialogContent class="min-w-[80%]">
		<DialogHeader>
			<DialogTitle>Design System Tokens</DialogTitle>
		</DialogHeader>
		{#await getSystemTokens}
			<span>Getting tokens...</span>
		{:then templates}
			<div class="flex flex-row flex-wrap items-center justify-center gap-4">
				{#each templates as template}
					<StartFromTokenCard tokenTemplateOverview={template} />
				{/each}
			</div>
		{/await}
	</DialogContent>
</Dialog>
