<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$components/ui/card'
	import type { SvelteComponentTyped } from 'svelte'

	export let title: string
	export let description: string
	export let image: string
</script>

<Card>
	<CardHeader>
		<CardTitle>
			{title}
		</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
	<CardContent>
		<slot />
	</CardContent>
</Card>
