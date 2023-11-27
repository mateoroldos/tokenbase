<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import * as Dialog from '.'
	import { cn } from '$lib/utils'

	type $$Props = DialogPrimitive.ContentProps & {
		showClose?: boolean
	}

	let className: $$Props['class'] = undefined
	export { className as class }
	export let showClose = true
</script>

<Dialog.Portal>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		class={cn(
			'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
			className
		)}
		{...$$restProps}
	>
		<slot />
		{#if showClose}
			<Dialog.Close />
		{/if}
	</DialogPrimitive.Content>
</Dialog.Portal>
