<script lang="ts">
	import type { Button as ButtonPrimitive } from 'bits-ui'
	import Button from '../ui/button/Button.svelte'
	import { cn } from '$lib/utils'
	import { tokenToolButtonVariants, type Variant } from '.'

	type $$Props = ButtonPrimitive.Props & {
		state?: Variant
	}
	type $$Events = ButtonPrimitive.Events

	let className: $$Props['class'] = undefined
	export let state: $$Props['state'] = 'disabled'
	export { className as class }
</script>

<Button
	class={cn(tokenToolButtonVariants({ state, className }))}
	{...$$restProps}
	variant="ghost"
	size="sm"
	on:click
>
	<slot />
</Button>
