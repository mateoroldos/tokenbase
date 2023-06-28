<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button, buttonVariants } from '$components/ui/button'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$components/ui/card'
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import Input from '$components/ui/input/Input.svelte'
	import Label from '$components/ui/label/Label.svelte'
	import Separator from '$components/ui/separator/Separator.svelte'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { Plus } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenbaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	let desingSystemName = ''
	let selectedAddDesignSystemType = 'start-from-scratch'

	const selectedCardClasses = 'border-blue-500'

	const addDesignSystemTypes = [
		{
			name: 'Start from scratch',
			slug: 'start-from-scratch',
			description:
				'Start with an empty canvas. Recommended for experienced users.',
			icon: `<File class="w-4" />`
		},
		{
			name: 'Start with a template',
			slug: 'start-with-a-template',
			description: 'Start with a template. Recommended for new users.',
			icon: `<File class="w-4" />`
		}
	]

	const handleAddDesignSystem = () => {
		const designSystemId = uuidv4()
		tokenbaseMainStore.addDesignSystem(designSystemId, 'Test')
		designTokensGroupStore.addGroup('Default', designSystemId)
		tokenbaseMainStore.selectDesignSystem(designSystemId)
		goto(`/${designSystemId}`)
	}
</script>

<section class="flex flex-col items-start justify-center gap-8 p-20">
	<h2 class="text-2xl font-medium">Welcome to Tokenbase</h2>
	<div class="flex flex-row flex-wrap justify-between gap-7">
		{#each $tokenbaseMainStore.designSystems as designSystem}
			<a href={`/${designSystem.id}`}>
				<Card class="min-w-[200px] max-w-md">
					<CardHeader>
						<CardTitle>{designSystem.name}</CardTitle>
						<CardDescription>Design System</CardDescription>
					</CardHeader>
					<Separator class="mb-3" />
					<CardContent>
						<span class="text-xs">Card Content</span>
					</CardContent>
				</Card>
			</a>
		{/each}
	</div>
	<!-- <Dialog>
		<DialogTrigger class={buttonVariants({ variant: 'default' })}>
			<Plus class="mr-2 h-4 w-4" />
			Add Design System
		</DialogTrigger>
		<DialogContent class="min-w-[800px]">
			<DialogHeader>
				<DialogTitle>Add new Design System</DialogTitle>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="flex flex-col gap-2">
					<Label>Design System name</Label>
					<Input id="name" bind:value={desingSystemName} class="col-span-3" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-8">
				{#each addDesignSystemTypes as addDesignSystemType}
					<Card
						on:click={() =>
							(selectedAddDesignSystemType = addDesignSystemType.slug)}
						class={`min-w-[200px] max-w-md cursor-pointer ${
							addDesignSystemType.slug === selectedAddDesignSystemType
								? selectedCardClasses
								: ''
						}`}
					>
						<CardHeader>
							<CardTitle class="flex flex-row items-center gap-2">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
									class:bg-blue-100={addDesignSystemType.slug ===
										selectedAddDesignSystemType}
								>
									<File class="w-4" />
								</div>
								{addDesignSystemType.name}
							</CardTitle>
							<CardDescription
								>{addDesignSystemType.description}</CardDescription
							>
						</CardHeader>
					</Card>
				{/each}
			</div>
			<DialogFooter>
				<Button type="submit">
					<Plus class="mr-2 h-4 w-4" />
					Add Design System
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog> -->
	<Button on:click={handleAddDesignSystem}>
		<Plus class="mr-2 h-4 w-4" />
		Add Design System
	</Button>
</section>
