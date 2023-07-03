<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip'
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$components/ui/accordion'
	import { Minus, Plus } from 'lucide-svelte'
	import InputWrapper from '$components/InputWrapper.svelte'
	import fontFamilySuite from '$lib/features/token-management/font-family/fontFamilySuite'

	export let token: IToken<'fontFamily'>

	$: isAlias = token.alias !== undefined

	function addInput() {
		token.value = [...token.value, '']
	}

	function removeInput(index: number) {
		token.value.splice(index, 1)
		token.value = [...token.value]
	}

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = fontFamilySuite(target.value, name)
	}

	let res = fontFamilySuite.get()
</script>

<div class="flex flex-row gap-4">
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
				<button class="ml-3" on:click={addInput}
					><Plus class="w-4 items-center" /></button
				>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add Font Family</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
	<div class="flex flex-col gap-4">
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger
					><input
						class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-xs"
						type="text"
						placeholder="Your fonts"
						disabled
					/></AccordionTrigger
				>
				{#each token.value as value, i}
					<AccordionContent>
						<div class="flex">
							<InputWrapper
								name="duration"
								errors={res.getErrors('fontFamilyToken')}
								isValid={res.isValid('fontFamilyToken')}
							>
								<input
									name="fontFamilyToken"
									class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
									type="text"
									bind:value
									on:input={handleChange}
									{...isAlias ? { disabled: true } : {}}
								/></InputWrapper
							>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<button
											class="ml-2 self-center"
											on:click={() => removeInput(i)}
										>
											<Minus class="w-4" /></button
										>
									</TooltipTrigger>
									<TooltipContent>
										<p>Remove Font Family</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</AccordionContent>
				{/each}
			</AccordionItem>
		</Accordion>
	</div>
</div>
