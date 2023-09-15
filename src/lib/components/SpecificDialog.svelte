<script type="ts">
	import { createDialog, melt } from '@melt-ui/svelte'
	import { X, Plus } from 'lucide-svelte'

	const {
		elements: {
			trigger,
			overlay,
			content,
			title,
			description,
			close,
			portalled
		},
		states: { open }
	} = createDialog({
		forceVisible: true
	})

	export let dialogItems: {
		trigger: string
		description: string
		function: any
	}
</script>

<button
	use:melt={$trigger}
	class="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
	><Plus class="mr-2 h-4 w-4" />
	{dialogItems.trigger}
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            p-6 shadow-lg"
			use:melt={$content}
		>
			<slot />
			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm bg-slate-100 px-4
                    text-sm font-medium leading-none text-slate-600"
				>
					Cancel
				</button>
				<button
					on:click={dialogItems.function}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					Create
				</button>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="text-magnum-800 hover:bg-magnum-100 focus:shadow-magnum-400 absolute right-4 top-4 inline-flex
                h-6 w-6 appearance-none items-center justify-center
                rounded-full p-1"
			>
				<X />
			</button>
		</div>
	{/if}
</div>
