<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$components/ui/tooltip'
	import { XCircle } from 'lucide-svelte'

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

<div class="input-wrapper flex flex-row gap-1">
	<slot />
	{#if errors && errors.length > 0}
		{#each errors as error}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger class="align-middle">
						{#if !isValid}
							<div class="flex flex-row">
								<XCircle class="h-3.5 w-4" />
							</div>
						{/if}
					</TooltipTrigger>
					<TooltipContent>
						<p>{error}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		{/each}
	{/if}
</div>
