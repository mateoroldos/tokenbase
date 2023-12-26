<script lang="ts">
	import { fly } from 'svelte/transition'
	import { cn } from '$lib/utils'
	import { getFormField, type ValidationProps } from 'formsnap'
	import { X } from 'lucide-svelte'

	type $$Props = ValidationProps
	export let tag = 'div'
	const { actions, errors, ids } = getFormField()
	$: attrs = {
		'data-fs-validation': '',
		'data-fs-error': $errors ? '' : undefined,
		id: $ids.validation
	}
</script>

<svelte:element this={tag} use:actions.validation {...attrs} {...$$restProps}
	>{#if $errors}
		{#each $errors as error (error)}
			<p
				in:fly={{ y: -10, duration: 200 }}
				class={cn(
					'text-xs font-medium text-destructive flex flex-row items-center gap-[0.1rem]'
				)}
			>
				<X class="w-3 h-3" />
				{error}
			</p>
		{/each}
	{/if}
</svelte:element>
