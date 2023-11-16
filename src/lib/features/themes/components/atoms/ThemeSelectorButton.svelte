<script lang="ts">
	import { cn } from '$lib/utils'

	export let disabled = false

	let className: string | undefined = undefined

	export { className as class }
</script>

<button
	class={cn(
		'flex h-5 items-center justify-center rounded-sm p-[2px] font-normal text-white transition-colors',
		className
	)}
	class:bg-slate-900={!disabled}
	class:bg-slate-300={disabled}
	{disabled}
	on:click
>
	<slot />
</button>
