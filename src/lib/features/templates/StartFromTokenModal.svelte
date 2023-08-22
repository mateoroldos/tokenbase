<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import StartFromTokenCard from './atoms/StartFromTokenCard.svelte'

	const getSystemTokens = fetch(`/api/tokens`).then(
		async (data) => await data.json()
	)
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Select a Token
	</Dialog.Trigger>
	<Dialog.Content class="min-w-[80%]">
		<Dialog.Header>
			<Dialog.Title>Design System Tokens</Dialog.Title>
		</Dialog.Header>
		{#await getSystemTokens}
			<span>Getting tokens...</span>
		{:then templates}
			<div class="flex flex-row flex-wrap items-center justify-center gap-4">
				{#each templates as template}
					<StartFromTokenCard tokenTemplateOverview={template} />
				{/each}
			</div>
		{/await}
	</Dialog.Content>
</Dialog.Root>
