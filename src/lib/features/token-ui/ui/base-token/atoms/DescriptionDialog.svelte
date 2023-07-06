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
	import transformToExportColorValue from '$lib/features/token-management/color/transformToExportColorValue'
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$components/ui/accordion'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'

	export let token: IToken

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let showTokenList = false

	const toggleTokenList = () => {
		showTokenList = !showTokenList
	}

	const createTokenAlias = (groupId: string, tokenId: string) => {
		if (tokenId !== token.id) {
			token.alias = {
				groupId,
				tokenId
			}
		} else {
			alert('Cannot select the same token as its own alias')
		}
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
				{#if token.description?.length != 0}
					<TooltipContent>
						<p>{token.description}</p>
					</TooltipContent>
				{/if}
			</Tooltip>
		</TooltipProvider>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogDescription>
				<h3>Token description</h3>
				<textarea bind:value={token.description} />
			</DialogDescription>
		</DialogHeader>
	</DialogContent>
</Dialog>
