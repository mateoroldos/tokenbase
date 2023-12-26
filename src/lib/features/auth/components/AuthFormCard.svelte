<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let description: string | undefined = undefined
</script>

<Card.Root class="flex flex-col gap-4 shadow-md">
	<Card.Header>
		<div class="flex flex-col gap-2 items-center">
			<img src="/LOGO_TOKENBASE.png" alt="Logo" class="h-7 w-7" />
			<Card.Title class="text-xl text-center">{title}</Card.Title>
		</div>
		{#if description}
			<Card.Description class="text-center">{description}</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content class="flex flex-col gap-5">
		<slot />
	</Card.Content>
</Card.Root>
