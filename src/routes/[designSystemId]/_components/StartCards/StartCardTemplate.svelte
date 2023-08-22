<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let description: string
	export let image: string
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			{title}
		</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<slot />
	</Card.Content>
</Card.Root>
