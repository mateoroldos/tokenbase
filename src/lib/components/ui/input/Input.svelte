<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { cn } from "$lib/utils";
	
	let className: string | undefined | null = undefined;
	
	export let value: HTMLInputAttributes['value'] = undefined
	export let autoWidth = false
	export let autoSelect = false
	export let autoName: string | undefined = undefined
	export { className as class }
	let input: HTMLInputElement

	$: if (autoSelect && input && (value === undefined || value === '')) {
		input.select()
	}

	$: if (autoName && input && (value === undefined || value === '')) {
		input.name = autoName
	}

	$: if (autoWidth && input) {
		input.size = value.length > 0 ? value.length : 7
	}
</script>

<input
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	bind:this={input}
	on:blur
	on:change
	on:click
	on:focus
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
/>
