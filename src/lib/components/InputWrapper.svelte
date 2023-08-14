<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$components/ui/tooltip'
	import { X } from 'lucide-svelte'

	let inputElement: HTMLInputElement
	const dispatch = createEventDispatcher()

	afterUpdate(() => {
		if (inputElement) {
			inputElement.addEventListener('input', handleChange)
		}
	})

	function handleChange(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value
		dispatch('input', inputValue)
	}

	export let name: string
	export let errors: string[] = []
	export let isValid: boolean = true
</script>

<div class="input-wrapper flex flex-row gap-2 items-center relative w-fit mr-0 pr-0">
	<slot />
	{#if errors && errors.length > 0}
		{#each errors as error}
			<div class="error-icon absolute right-1">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger class="align-middle">
							{#if !isValid}
								<div class="flex flex-row w-3">
									<X class="h-3 w-3 text-red-700" />
								</div>
							{/if}
						</TooltipTrigger>
						<TooltipContent>
							<p>{error}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		{/each}
	{:else}
		<div class="error-icon"/>
	{/if}
</div>
