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
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import Input from '$components/ui/input/Input.svelte'
	import Label from '$components/ui/label/Label.svelte'
	import Separator from '$components/ui/separator/Separator.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { Plus } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenbaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	let desingSystemName = ''

	const handleAddDesignSystem = () => {
		const designSystemId = uuidv4()
		tokenbaseMainStore.addDesignSystem(
			designSystemId,
			desingSystemName ?? 'New Design System'
		)

		goto(`/${designSystemId}`)
	}
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center gap-4 p-20"
>
	<h2 class="text-2xl font-medium">Welcome to Tokenbase</h2>
	<div class="flex flex-row flex-wrap justify-between gap-7">
		{#each $tokenbaseMainStore as designSystem}
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
	{#if $tokenbaseMainStore.length === 0}
		<div class="relative flex w-3/6 flex-row gap-2">
			<Input
				id="name"
				bind:value={desingSystemName}
				class="bg-red col-span-5 w-full pr-12 drop-shadow-sm placeholder:text-slate-400"
				placeholder="Write the name of your first design system"
			/>
			<Button
				on:click={handleAddDesignSystem}
				class="bg-tertiary absolute right-0 top-0 flex h-full items-center px-2 font-normal text-slate-400 hover:bg-transparent"
			>
				<Plus class="mr-1 h-4" />
				Create
			</Button>
		</div>
	{:else}
		<Dialog>
			<DialogTrigger class={buttonVariants({ variant: 'default' })}>
				<Plus class="mr-2 h-4 w-4" />
				Add Design System
			</DialogTrigger>
			<DialogContent class="max-w-sm">
				<DialogHeader>
					<DialogTitle>Add new Design System</DialogTitle>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<div class="flex flex-col gap-2">
						<Label>Design System name</Label>
						<Input id="name" bind:value={desingSystemName} class="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button on:click={handleAddDesignSystem}>
						<Plus class="mr-2 h-4 w-4" />
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	{/if}
</section>
