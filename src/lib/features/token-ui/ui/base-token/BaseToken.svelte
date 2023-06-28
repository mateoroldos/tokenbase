<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import Icon from '@iconify/svelte'
	import { getContext, onMount } from 'svelte'
	import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import TokenTypeSelect from '../atoms/TokenTypeSelect.svelte'
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import descriptionSuite from '../generic-validations/descriptionSuite'
	import { Checkbox } from '$components/ui/checkbox'
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
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

	export let token: IToken
	export let draggedTokenId: string | null

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let hover = false
	let selected: boolean = $selectedTokensStore.includes(token) || false

	$: if (selected) {
		selectedTokensStore.addToken(token)
	} else if (!selected) {
		selectedTokensStore.removeToken(token)
	}

	const handleTokenTypeChange = () => {
		token.value = getDefaultTokenValues(token.type)
	}

	const handleDeleteToken = () => {
		selectedTokensStore.removeToken(token)
		designTokensGroupStore.deleteToken(token.id)
	}

	const handleUnselectNameInput = () => {
		if (token.name === undefined || token.name === '') {
			token.name = 'Untitled'
		}
	}

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = descriptionSuite(target.value, 'description')
	}

	let res = descriptionSuite.get()

	let showTokenList = false

	const toggleTokenList = () => {
		showTokenList = !showTokenList
	}

	const createTokenAlias = (groupId: string, tokenId: string) => {
		token.alias = {
			groupId,
			tokenId
		}
	}

	onMount(() => {
		if (token.name === undefined) {
			const input = document.getElementById(
				`${token.id}-name`
			) as HTMLInputElement
			input?.select()
		}
	})
	console.log($designTokensGroupStore)
</script>

<div
	class="flex flex-row items-center gap-2 border-b border-solid border-gray-200 px-3 py-2"
	class:bg-gray-100={draggedTokenId === token.id}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:dragenter
	on:dragend
	ondragover="return false"
>
	<div class="flex flex-row items-center gap-1">
		<div class="flex w-8 flex-row items-center justify-between">
			<div>
				{#if hover}
					<div on:dragstart draggable={true} class="cursor-grab">
						<Icon icon="tabler:line-height" class="text-gray-400" />
					</div>
				{/if}
			</div>
			{#if hover || selected}
				<Checkbox bind:checked={selected} />
			{/if}
		</div>
		<div class="flex flex-row gap-2">
			<TokenTypeSelect
				bind:value={token.type}
				on:change={handleTokenTypeChange}
			/>
			<input
				class="rounded-md border-2 border-solid border-gray-200 px-1 text-sm font-medium"
				id={`${token.id}-name`}
				placeholder="Untitled"
				bind:value={token.name}
				on:focusout={handleUnselectNameInput}
			/>
			<div class="flex flex-row">
				<input
					bind:value={token.description}
					on:input={handleChange}
					placeholder="Description"
					class="w-52 items-center rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
				/>
			</div>
		</div>
		{#if !token.alias}
			<Dialog>
				<DialogTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								><button on:click={toggleTokenList}>
									<Icon icon="tabler:link" />
								</button></TooltipTrigger
							>
							<TooltipContent>
								<p>Create alias</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider></DialogTrigger
				>
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
		{/if}
	</div>
	<slot />
	<div class="w-3">
		{#if hover}
			<button
				on:click={handleDeleteToken}
				class="bg-transparent"
				in:fly={{ x: -5, duration: 350 }}
			>
				<Icon icon="tabler:trash" class="text-red-500" />
			</button>
		{/if}
	</div>
</div>
