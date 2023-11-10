<script lang="ts">
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../../stores/activeThemeIndexStore'
	import * as Select from '$lib/components/ui/select'

	export let themes: Theme[]
</script>

<Select.Root bind:value={$activeThemeIndex}>
	<Select.Trigger
		class="h-2 w-[125px] justify-start gap-1 px-0 text-xs focus:ring-0 focus:ring-transparent focus:ring-offset-transparent"
	>
		<Select.Value />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each themes as theme, i (theme.id)}
				<Select.Item value={i} label={theme.name}>
					{theme.name}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
