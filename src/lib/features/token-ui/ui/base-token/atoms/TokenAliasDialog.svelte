<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { Link2 } from 'lucide-svelte'
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
					<button on:click={toggleTokenList}>
						<Link2 class="h-4 w-4" />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Create alias</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogDescription>
				<h3>Select your alias</h3>
				<div class="flex flex-col gap-6">
					{#each $designTokensGroupStore as group}
						{#if group.tokens.length > 0}
							<div>
								<div class="flex flex-col gap-4 pb-2">
									<Accordion type="single" collapsible>
										<AccordionItem value="item-1">
											<AccordionTrigger>
												<h3 class="pb-2 text-base text-black">
													{group.name}
												</h3>
											</AccordionTrigger>
											<AccordionContent>
												<div class="flex flex-col gap-2">
													{#each group.tokens as t}
														<div>
															<button
																class="flex flex-row gap-2"
																on:click={() =>
																	createTokenAlias(group.id, t.id)}
															>
																<p class="text-black">{t.name}</p>
																<p>{t.type}</p>

																{#if t.type === 'color'}
																	<div
																		class="mr-4 h-6 min-w-[1.5rem] rounded border border-gray-400 text-black"
																		style={`background-color: ${transformToExportColorValue(
																			t.value
																		)}`}
																	/>
																{:else if t.type === 'dimension'}
																	<p class="mr-4 text-gray-400">
																		{t.value.value}
																	</p>
																{:else}
																	<p class=" mr-4 text-gray-400">
																		{t.value}
																	</p>
																{/if}
															</button>
														</div>
													{/each}
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</DialogDescription>
		</DialogHeader>
	</DialogContent>
</Dialog>
