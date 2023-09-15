<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { Link2 } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'
	import * as Dialog from '$lib/components/ui/dialog'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import transformToExportColorValue from '$lib/features/token-management/color/transformToExportColorValue'
	import * as Accordion from '$lib/components/ui/accordion'
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

<Dialog.Root>
	<Dialog.Trigger>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<button on:click={toggleTokenList}>
					<Link2 class="h-4 w-4" />
				</button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Create alias</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Description>
				<h3>Select your alias</h3>
				<div class="max-h-96 overflow-y-auto">
					<div class="flex flex-col gap-6">
						{#each $designTokensGroupStore as group}
							{#if (group.tokens.length > 0 && group.parentGroup === $page.params.designSystemId) || group.id === $page.params.groupId}
								<div>
									<div class="flex flex-col gap-4 pb-2">
										<Accordion.Root>
											<Accordion.Item value="item-1">
												<Accordion.Trigger>
													<h3 class="pb-2 text-base text-black">
														{group.name}
													</h3>
												</Accordion.Trigger>
												<Accordion.Content>
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
																			class="mr-4 h-6 min-w-[1.5rem] rounded border border-slate-400 text-black"
																			style={`background-color: ${transformToExportColorValue(
																				t.value
																			)}`}
																		/>
																	{:else if t.type === 'dimension'}
																		<p class="mr-4 text-slate-400">
																			{t.value.value}
																		</p>
																	{:else}
																		<p class=" mr-4 text-slate-400">
																			{t.value}
																		</p>
																	{/if}
																</button>
															</div>
														{/each}
													</div>
												</Accordion.Content>
											</Accordion.Item>
										</Accordion.Root>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
