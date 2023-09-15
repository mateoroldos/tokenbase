<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils'

	type $$Props = SelectPrimitive.ContentProps

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Content
	class={cn(
		'relative z-50 min-w-[8rem] translate-y-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-80',
		className
	)}
	{...$$restProps}
>
	<div class="w-full p-1">
		<slot />
	</div>
</SelectPrimitive.Content>
