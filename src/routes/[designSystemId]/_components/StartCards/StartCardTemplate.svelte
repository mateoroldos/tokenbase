<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let content: string
</script>

<Card.Root class="flex flex-col">
	<Card.Header>
		<Card.Title class="text-md font-medium">
			{title}
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex-1 text-sm">
		{content}
	</Card.Content>
	<Card.Footer>
		<slot />
	</Card.Footer>
</Card.Root>
