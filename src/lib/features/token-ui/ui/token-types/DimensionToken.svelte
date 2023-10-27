<script lang="ts">
	import { activeThemeIndex } from '$lib/features/themes/activeThemeIndexStore'
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'dimension'>

	$: isAlias = token.alias !== undefined

	$: activeThemeTokenValue = token.value[$activeThemeIndex]

	let options = ['px', 'rem']
</script>

<div class="flex gap-3">
	<div>
		<Input
			name="dimension"
			class="h-8 w-[80px] "
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={activeThemeTokenValue.value}
		/>
	</div>
	<div class="flex items-center">
		<Select.Root bind:value={activeThemeTokenValue.unit}>
			<Select.Trigger
				class="h-8 w-[60px] "
				{...isAlias ? { disabled: true } : {}}
			>
				<Select.Value placeholder={activeThemeTokenValue.unit} />
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
