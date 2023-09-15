<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Card from '$lib/components/ui/card'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'
	import Input from '$lib/components/ui/input/input.svelte'
	import Separator from '$lib/components/ui/separator/separator.svelte'
	import Button from '$lib/components/ui/button/button.svelte'
	import { SquareEqual } from 'lucide-svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenbaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	let desingSystemName = ''

	const handleAddDesignSystem = async () => {
		const designSystemId = uuidv4()

		await goto(`/${designSystemId}`)

		tokenbaseMainStore.addDesignSystem(
			designSystemId,
			desingSystemName ?? 'New Design System'
		)
	}

	let dialogItems = {
		trigger: 'Add new design system',
		title: 'Design System',
		description: 'HOla',
		function: handleAddDesignSystem,
		value: desingSystemName
	}
</script>

<header
	class="flex flex-row items-center justify-between px-20 py-6 shadow-2xl"
>
	<a href="/" class="text-lg font-medium">
		<SquareEqual class="mb-1 inline-block h-6 w-6" />
		Tokenbase
	</a>
	<nav>
		<ul>
			<li>
				<a
					href="/blog"
					class="text-slate-400 transition-colors hover:text-slate-900">Blog</a
				>
			</li>
		</ul>
	</nav>
</header>
<section
	class="flex flex-1 flex-col items-center justify-center gap-20 border bg-slate-100 p-20"
>
	<form
		on:submit|preventDefault={() => handleAddDesignSystem()}
		class="relative flex w-2/5 flex-row gap-2"
	>
		<Input
			id="name"
			bind:value={desingSystemName}
			class="w-full rounded-full border border-slate-200 bg-white p-6 pr-14 text-lg font-medium shadow-lg placeholder:font-normal placeholder:text-slate-300"
			placeholder="Enter the name of your Design System"
			autocomplete="off"
			autoSelect={$tokenbaseMainStore.length > 0 ? false : true}
		/>
		<Button
			class={`absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center px-2 font-normal  ${
				desingSystemName.length > 0 ? 'text-slate-500' : 'text-slate-300'
			}`}
			variant="ghost"
			type="submit"
		>
			⏎
		</Button>
	</form>
	<div class="flex flex-row flex-wrap justify-center gap-7">
		{#each $tokenbaseMainStore as designSystem}
			<a href={`/${designSystem.id}`}>
				<Card.Root
					class="min-w-[200px] max-w-md rounded-xl  bg-slate-100 shadow-none transition-all duration-500 hover:bg-white hover:shadow-lg"
				>
					<Card.Header>
						<Card.Title class="text-sm font-medium"
							>{designSystem.name}</Card.Title
						>
						<!-- <Card.Description class="text-xs text-slate-400"
							>Design System</Card.Description
						> -->
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
</section>
