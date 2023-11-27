<script lang="ts">
	import { cn } from '$lib/utils'
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import { X } from 'lucide-svelte'

	let className: string | undefined = undefined
	export { className as class }
</script>

<DialogPrimitive.Close
	class={cn(
		'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
		className
	)}
>
	<slot>
		<X class="h-4 w-4" />
		<span class="sr-only">Close</span>
	</slot>
</DialogPrimitive.Close>
