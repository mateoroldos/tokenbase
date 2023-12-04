<script lang="ts">
	import type { ComponentType } from 'svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import Switch from '$lib/components/ui/switch/Switch.svelte'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'

	let viewModeStatus = 'View mode: Off'

	$: {
		if ($viewMode) {
			viewMode.set(true)
			viewModeStatus = 'View mode: On'
		} else {
			viewMode.set(false)
			viewModeStatus = 'View mode: Off'
		}
	}
</script>

<!-- <Tooltip.Root>
	<Tooltip.Trigger>
		<div class="flex flex-row items-center gap-2">
			<Switch bind:checked={$viewMode} />
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<span class="text-xs text-slate-700">{viewModeStatus}</span>
	</Tooltip.Content>
</Tooltip.Root> -->
