<script lang="ts">
	import type { ComponentType } from 'svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'

	export let icon: ComponentType
	export let action: () => void
	export let name: string
	export let active = true
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<div class="flex flex-row items-center gap-2">
			<slot />
			<button
				class="flex flex-col items-center"
				on:click={action}
				disabled={!active}
				class:text-slate-300={!active}
				class:text-slate-600={active}
			>
				<svelte:component this={icon} class="w-4" />
			</button>
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<span class="text-xs text-slate-700">{name}</span>
	</Tooltip.Content>
</Tooltip.Root>
