<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Card from '$lib/components/ui/card'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import Button from '$lib/components/Button.svelte'
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

<section class="flex flex-col items-start justify-center gap-8 p-20">
	<h2 class="text-2xl font-medium">Welcome to Tokenbase</h2>
	<div class="flex flex-row flex-wrap justify-between gap-7">
		{#each $tokenbaseMainStore as designSystem}
			<a href={`/${designSystem.id}`}>
				<Card.Root class="min-w-[200px] max-w-md">
					<Card.Header>
						<Card.Title>{designSystem.name}</Card.Title>
						<Card.Description>Design System</Card.Description>
					</Card.Header>

					<Card.Content>
						<span class="text-xs">Card Content</span>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>

	<Dialog.Root>
		<Dialog.Trigger
			><Plus class="mr-2 h-4 w-4" />
			Add Design System</Dialog.Trigger
		>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Add new Design System</Dialog.Title>
				<Dialog.Description>
					<div class="grid gap-4 py-4">
						<div class="flex flex-col gap-2">
							<Label>Design System name</Label>
							<Input
								id="name"
								bind:value={desingSystemName}
								class="col-span-3"
							/>
						</div>
					</div>
				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Button on:click={handleAddDesignSystem}>
					<Plus class="mr-2 h-4 w-4" />
					Create
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</section>
