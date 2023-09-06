<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Card from '$lib/components/ui/card'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'
	import Input from '$lib/components/ui/input/input.svelte'
	import Separator from '$lib/components/ui/separator/separator.svelte'
	import Label from '$lib/components/ui/label/label.svelte'
	import SpecificDialog from '$lib/components/SpecificDialog.svelte'
	import Button from '$lib/components/ui/button/button.svelte'
	import { Plus } from 'lucide-svelte'

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
		console.log('añadido')
	}

	let dialogItems = {
		trigger: 'Add new design system',
		title: 'Design System',
		description: 'HOla',
		function: handleAddDesignSystem,
		value: desingSystemName
	}
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center gap-4 p-20"
>
	<h2 class="text-2xl font-medium">Welcome to Tokenbase</h2>
	<div class="flex flex-row flex-wrap justify-between gap-7">
		{#each $tokenbaseMainStore as designSystem}
			<a href={`/${designSystem.id}`}>
				<Card.Root class="min-w-[200px] max-w-md">
					<Card.Header>
						<Card.Title>{designSystem.name}</Card.Title>
						<Card.Description>Design System</Card.Description>
					</Card.Header>
					<Separator class="mb-3" />
					<Card.Content>
						<span class="text-xs">Card Content</span>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>
	{#if $tokenbaseMainStore.length === 0}
		<div class="relative flex w-3/6 flex-row gap-2">
			<Input
				id="name"
				bind:value={desingSystemName}
				class="bg-red col-span-5 w-full pr-12 drop-shadow placeholder:text-slate-400"
				placeholder="Write the name of your first design system"
			/>
			<Button
				on:click={handleAddDesignSystem}
				class="  flex  items-center px-2 font-normal"
			>
				<Plus class="mr-1 h-4" />
				Create
			</Button>
		</div>
	{:else}
		<SpecificDialog {dialogItems}>
			<div class="flex flex-col gap-4">
				<Label>Create design system</Label>
				<Input id="name" bind:value={desingSystemName} class="col-span-3" />
			</div>
		</SpecificDialog>
	{/if}
</section>
