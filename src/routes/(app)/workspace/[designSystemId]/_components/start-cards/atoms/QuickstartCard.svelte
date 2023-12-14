<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let content: string
</script>

<Card.Root
	class="flex flex-col hover:bg-slate-50 cursor-pointer transition-colors h-full"
>
	<Card.Header>
		<Card.Title class="text-md font-normal text-slate-400">
			Import a <span class="text-slate-800 font-medium">{title}</span>
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex-1 text-sm text-slate-400">
		{content}
	</Card.Content>
</Card.Root>
