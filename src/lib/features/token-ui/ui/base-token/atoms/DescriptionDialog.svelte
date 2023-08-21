<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { Text } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTrigger
	} from '$components/ui/dialog'
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$components/ui/tooltip'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
		CardFooter
	} from '$components/ui/card'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import Button from '$components/ui/button/Button.svelte'
	import Textarea from '$components/ui/textarea/Textarea.svelte'

	export let token: IToken

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let showTokenList = false

	const toggleTokenList = () => {
		showTokenList = !showTokenList
	}
</script>

<Dialog>
	<DialogTrigger>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<button
						on:click={toggleTokenList}
						class:text-gray-300={token.description?.length === 0 ||
							!token.description}
					>
						<Text class="h-4 w-4" />
					</button>
				</TooltipTrigger>
				{#if token.description?.length != 0 && token.description != undefined}
					<TooltipContent>
						<p>{token.description}</p>
					</TooltipContent>
				{:else if token.description == undefined}
					<TooltipContent>
						<p>Add a description</p>
					</TooltipContent>
				{/if}
			</Tooltip>
		</TooltipProvider>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogDescription>
				<Card class="border-none shadow-none">
					<CardHeader>
						<CardTitle>Description</CardTitle>
						<CardDescription>Edit {token.name} description</CardDescription>
					</CardHeader>
					<CardContent>
						<Textarea
							bind:value={token.description}
							placeholder="Write it here!"
						/>
					</CardContent>
					<CardFooter>
						<Button class="w-20">Confirm</Button>
					</CardFooter>
				</Card>
			</DialogDescription>
		</DialogHeader>
	</DialogContent>
</Dialog>
