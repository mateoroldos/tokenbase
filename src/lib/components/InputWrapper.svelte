<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
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

<div
	class="input-wrapper relative mr-0 flex w-fit flex-row items-center gap-2 pr-0"
>
	<slot />
	{#if errors && errors.length > 0}
		{#each errors as error}
			<div class="error-icon absolute right-1">
				<Tooltip.Root>
					<Tooltip.Trigger class="align-middle">
						{#if !isValid}
							<div class="flex w-3 flex-row">
								<X class="h-3 w-3 text-red-700" />
							</div>
						{/if}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{error}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		{/each}
	{:else}
		<div class="error-icon" />
	{/if}
</div>
