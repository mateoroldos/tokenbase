<script lang="ts">
	import Button from '$components/ui/button/Button.svelte'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$components/ui/card'

	export let title: string
	export let description: string
	export let link: string
	export let linkText: string
	export let image: string
</script>

<Card>
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
	<CardContent>
		<Button>{linkText}</Button>
	</CardContent>
</Card>
