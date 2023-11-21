<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import { viewMode } from '../../../viewMode/stores/viewMode'
	import type { CubicBezierTokenValue } from '$lib/features/token-management/cubic-bezier/types/internal-cubic-bezier-value.type'

	export let tokenValue: CubicBezierTokenValue
	export let isAlias: boolean
</script>

<div class="flex gap-x-3">
	<div class="flex flex-row gap-2">
		<Input
			disabled={$viewMode}
			name="p1x"
			class="disabled:opacity-1 h-8 w-[60px]"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue[0]}
			min="0"
			max="1"
			id="p1x"
		/><span
			class=" flex items-center
		text-sm">p1x</span
		>
	</div>
	<div class="flex flex-row gap-2">
		<Input
			disabled={$viewMode}
			id="p1y"
			name="p1y"
			class="disabled:opacity-1 h-8 w-[60px]"
			type="number"
			size={1}
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue[1]}
		/><span
			class=" flex items-center
		text-sm">p1y</span
		>
	</div>
	<div class="flex flex-row gap-2">
		<Input
			disabled={$viewMode}
			id="p2x"
			name="p2x"
			class="disabled:opacity-1 h-8 w-[60px]"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue[2]}
		/><span
			class=" flex items-center
		text-sm">p2x</span
		>
	</div>
	<div class="flex flex-row gap-2">
		<Input
			disabled={$viewMode}
			id="p2y"
			name="p2y"
			class="disabled:opacity-1 h-8 w-[60px]"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue[3]}
			min="0"
			max="1"
		/><span
			class=" flex items-center
		text-sm">p2y</span
		>
	</div>
</div>
