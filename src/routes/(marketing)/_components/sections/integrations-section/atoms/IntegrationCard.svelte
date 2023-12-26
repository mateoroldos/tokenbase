<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import Icon from '@iconify/svelte'

	export let title: string
	export let description: string
	export let icon: string
</script>

<Card.Root>
	<Card.Header class="flex flex-col items-center gap-2">
		<Icon {icon} height={60} />
		<Card.Title class="text-2xl font-medium text-center">{title}</Card.Title>
		<Card.Description class="text-md text-center max-w-[30ch]"
			>{description}</Card.Description
		>
	</Card.Header>
</Card.Root>
