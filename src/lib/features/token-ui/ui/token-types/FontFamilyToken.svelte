<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import * as Accordion from '$lib/components/ui/accordion'
	import { Minus, Plus } from 'lucide-svelte'
	import fontFamilySuite from '$lib/features/token-management/font-family/fontFamilySuite'
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'

	export let token: IToken<'fontFamily'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = fontFamilySuite(target.value, name)
	}

	let res = fontFamilySuite.get()

	function addInput() {
		token.value = [...token.value, '']
	}

	function removeInput(index: number) {
		token.value.splice(index, 1)
		token.value = [...token.value]
	}
</script>

<div class="flex flex-row gap-4">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<button class="ml-3" on:click={addInput}
				><Plus class="w-4 items-center" /></button
			>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add Font Family</p>
		</Tooltip.Content>
	</Tooltip.Root>

	<div class="flex flex-col gap-4">
		<Accordion.Root>
			<Accordion.Item value="item-1">
				<Accordion.Trigger
					><input
						class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-xs"
						type="text"
						placeholder="Your fonts"
						disabled
					/></Accordion.Trigger
				>
				{#if Array.isArray(token.value)}
					{#each token.value as value, i}
						<Accordion.Content>
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

								<Tooltip.Root>
									<Tooltip.Trigger>
										<button
											class="ml-2 self-center"
											on:click={() => removeInput(i)}
										>
											<Minus class="w-4" /></button
										>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>Remove Font Family</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</div>
						</Accordion.Content>
					{/each}
				{/if}
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>
