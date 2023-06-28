<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import Icon from '@iconify/svelte'
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip'

	export let token: IToken<'fontFamily'>

	$: isAlias = token.alias !== undefined

	function addInput() {
		token.value = [...token.value, '']
	}

	function removeInput(index: number) {
		token.value.splice(index, 1)
		token.value = [...token.value]
	}
</script>

<div class="flex flex-row gap-2">
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
				<button class="mr-2" on:click={addInput}
					><Icon icon="tabler:square-rounded-plus" /></button
				>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add Font Family</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
	<div class="flex flex-col gap-4">
		{#each token.value as value, i}
			<div class="flex">
				<input
					class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
					type="text"
					bind:value
					{...isAlias ? { disabled: true } : {}}
				/>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<button class="ml-2 self-center" on:click={() => removeInput(i)}>
								<Icon icon="tabler:square-rounded-x" /></button
							>
						</TooltipTrigger>
						<TooltipContent>
							<p>Remove Font Family</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		{/each}
	</div>
</div>
