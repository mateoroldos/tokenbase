<script lang="ts">
	import * as Select from '$lib/components/ui/select'
	import { ChevronDown } from 'lucide-svelte'
	import { Input } from '$lib/components/ui/input'
	import { viewMode } from '../../../viewMode/stores/viewMode'
	import type { FontWeightTokenValue } from '$lib/features/token-management/font-weight/types/internal-font-weight-value.type'

	export let tokenValue: FontWeightTokenValue
	export let isAlias: boolean

	const fontWeigthValueOptions = [
		'thin',
		'200',
		'300',
		'400',
		'medium',
		'600',
		'bold',
		'800',
		'black',
		'custom'
	]

	let isCustom = false

	const handleCustomInputChange = (e) => {
		tokenValue = e.srcElement.value
	}

	const handleOptionChange = (value) => {
		isCustom = value === 'custom'
	}
</script>

<div class="flex flex-row gap-2">
	<Select.Root bind:value={tokenValue} disabled={isAlias || $viewMode}>
		<Select.Trigger class="disabled:opacity-1 w-[100px]">
			<Select.Value
				placeholder={isCustom ? 'custom' : fontWeigthValueOptions[4]}
			/>
			{#if !$viewMode}
				<ChevronDown class="h-3 pl-3" />
			{/if}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each fontWeigthValueOptions as option}
					<Select.Item
						on:m-click={() => handleOptionChange(option)}
						class="pl-4"
						bind:value={option}
						label={option}>{option}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input />
	</Select.Root>
	{#if isCustom}
		<Input
			disabled={$viewMode}
			class="disabled:opacity-1 h-8 w-[100px]"
			type="text"
			bind:value={tokenValue}
			on:input={handleCustomInputChange}
		/>
	{/if}
</div>
