<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { viewMode } from '../../../stores/viewMode';

	export let token: IToken<'dimension'>

	let viewModeValue: boolean;
	viewMode.subscribe(value => {
		viewModeValue = value;
	});

	$: isAlias = token.alias !== undefined

	let options = ['px', 'rem']
</script>

<div class="flex gap-3">
	<div>
		<Input disabled={viewModeValue}
			name="dimension"
			class="h-8 w-[80px] disabled:opacity-1"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={token.value.value}
		/>
	</div>
	<div class="flex items-center">
		<Select.Root bind:value={token.value.unit} disabled={viewModeValue}>
			<Select.Trigger
				class="h-8 w-[60px] disabled:opacity-1"
				{...isAlias ? { disabled: true } : {}}
			>
				<Select.Value placeholder={token.value.unit} />
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
