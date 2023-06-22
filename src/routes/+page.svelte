<script lang="ts">
	import Button from '$components/ui/button/Button.svelte'
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card'
	import Separator from '$components/ui/separator/Separator.svelte'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { Plus } from 'lucide-svelte'
	import { getContext } from 'svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenbaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')
</script>

<section class="flex flex-col items-start justify-center gap-8 p-20">
	<h2 class="text-2xl font-medium">Welcome to Tokenbase</h2>
	<div class="flex flex-row flex-wrap justify-between gap-7">
		{#each $tokenbaseMainStore.designSystems as designSystems}
			<Card class="min-w-[200px] max-w-md">
				<CardHeader>
					<CardTitle>{designSystems.name}</CardTitle>
					<CardDescription>Design System</CardDescription>
				</CardHeader>
				<Separator class="mb-3" />
				<CardContent>
					<span class="text-xs">Card Content</span>
				</CardContent>
			</Card>
		{/each}
	</div>
	<Button>
		<Plus class="mr-2 h-4 w-4" />
		Add Design System
	</Button>
</section>
