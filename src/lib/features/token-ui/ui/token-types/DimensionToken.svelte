<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import type { DimensionTokenValue } from '$lib/features/token-management/dimension/types/internal-dimension-value.type'

	export let tokenValue: DimensionTokenValue
	export let isAlias: boolean
	export let viewMode = false

	let options = ['px', 'rem']
</script>

<div class="flex gap-3">
	<div>
		<Input
			disabled={viewMode}
			name="dimension"
			class="disabled:opacity-1 h-8 w-[80px]"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={tokenValue.value}
		/>
	</div>
	<div class="flex items-center">
		<Select.Root bind:value={tokenValue.unit} disabled={viewMode}>
			<Select.Trigger
				class="disabled:opacity-1 h-8 w-[60px]"
				{...isAlias ? { disabled: true } : {}}
			>
				<Select.Value placeholder={tokenValue.unit} />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label class="pl-2">Unit</Select.Label>
					{#each options as option}
						<Select.Item class="pl-2" value={option} label={option}
							>{option}</Select.Item
						>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</div>
