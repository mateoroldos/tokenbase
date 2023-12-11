<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'
	import type { InputEvents } from '.'

	type $$Props = HTMLInputAttributes & {
		autoWidth?: boolean
		autoSelect?: boolean
		autoName?: string
	}
	type $$Events = InputEvents

	let className: $$Props['class'] = undefined
	export let value: $$Props['value'] = undefined
	export { className as class }

	export let autoWidth = false
	export let autoSelect = false
	export let autoName: string | undefined = undefined

	let input: HTMLInputElement

	$: if (autoSelect && input && (value === undefined || value === '')) {
		input.select()
	}

	$: if (autoName && input && (value === undefined || value === '')) {
		input.name = autoName
	}

	$: if (autoWidth && input) {
		input.size = value.length > 0 ? value.length + 4 : 7
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
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focusout
	on:paste
	on:input
	autocomplete="false"
	{...$$restProps}
/>
