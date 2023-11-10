<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils'

	type $$Props = SelectPrimitive.ItemProps
	type $$Events = SelectPrimitive.ItemEvents

	let className: $$Props['class'] = undefined
	export let value: $$Props['value']
	export let label: $$Props['label'] = undefined
	export let disabled: $$Props['disabled'] = undefined

	export { className as class }
</script>

<SelectPrimitive.Item
	{value}
	{disabled}
	{label}
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...$$restProps}
	on:m-click
>
	<slot />
</SelectPrimitive.Item>
