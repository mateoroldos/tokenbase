<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import durationSuite from '$lib/features/token-management/duration/durationSuite'
	import { Import } from 'lucide-svelte'
	import { viewMode } from '../../../viewMode/stores/viewMode'
	import type { DurationTokenValue } from '$lib/features/token-management/duration/types/internal-duration.value.type'

	export let tokenValue: DurationTokenValue
	export let isAlias: boolean
</script>

<div>
	<div class="flex flex-row gap-2">
		<Input
			disabled={$viewMode}
			name="duration"
			class="disabled:opacity-1 h-8 w-[80px]"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue}
		/>
		<span
			class=" flex items-center
			 text-sm">ms</span
		>
	</div>
</div>
