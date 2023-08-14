<script lang="ts">
	import CardFooter from './../../../components/ui/card/CardFooter.svelte'
	import type { Template } from '$lib/features/templates/templates/template-interface'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$components/ui/card'
	import Separator from '$components/ui/separator/Separator.svelte'
	import { Button } from '$components/ui/button'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { page } from '$app/stores'

	export let tokenTemplateOverview: Template

	const handleCreateSystemFromTemplate = async () => {
		const templateFile = await import(tokenTemplateOverview.path)

		const desingSystemId = $page.params.designSystemId as string

		importStyleDictionary(JSON.stringify(templateFile.default), desingSystemId)
	}
</script>

<Card class="w-[250px]">
	<CardHeader>
		<CardTitle>{tokenTemplateOverview.name}</CardTitle>
		<CardDescription>Design System</CardDescription>
	</CardHeader>
	<Separator class="mb-3" />
	<CardContent>
		<p>{tokenTemplateOverview.description}</p>
	</CardContent>
	<CardFooter>
		<Button on:click={handleCreateSystemFromTemplate}>Use token</Button>
	</CardFooter>
</Card>
