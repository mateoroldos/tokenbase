<script lang="ts">
	import type { Button as ButtonPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils'
	import { tokenToolAliasButtonVariants, type Variant } from '.'
	import TokenToolButton from '$lib/components/token-tool-button/TokenToolButton.svelte'

	type $$Props = ButtonPrimitive.Props & {
		state?: Variant
	}
	type $$Events = ButtonPrimitive.Events

	let className: $$Props['class'] = undefined
	export let state: $$Props['state'] = 'disabled'
	export { className as class }
</script>

<TokenToolButton
	class={cn(tokenToolAliasButtonVariants({ state, className }))}
	{...$$restProps}
	state="disabled"
	on:click
>
	<slot />
</TokenToolButton>
