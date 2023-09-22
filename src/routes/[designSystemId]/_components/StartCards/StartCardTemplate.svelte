<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import { Separator } from '$lib/components/ui/separator'
	import { Palette } from 'lucide-svelte'

	export let title: string
	export let description: string
	export let content: string
</script>

<Card.Root class="flex h-full  flex-1 flex-col">
	<Card.Header>
		<Card.Title class="text-md font-medium">
			{title}
		</Card.Title>
		<Card.Description
			class="flex flex-row items-center text-xs leading-[0] text-slate-400"
			><Palette class="mr-1 h-3 w-3" /><span>{description}</span
			></Card.Description
		>
	</Card.Header>
	<Separator class="mb-3" />
	<Card.Content class="text-sm">
		{content}
	</Card.Content>
	<Card.Footer>
		<slot />
	</Card.Footer>
</Card.Root>
