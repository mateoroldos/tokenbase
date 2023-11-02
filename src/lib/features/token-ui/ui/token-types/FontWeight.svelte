<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import * as Select from '$lib/components/ui/select'
	import { ChevronDown } from 'lucide-svelte'
	import { Input } from '$lib/components/ui/input'
	import { viewMode } from '../../../stores/viewMode';

	export let token: IToken<'fontWeight'>

	let viewModeValue: boolean;
	viewMode.subscribe(value => {
		viewModeValue = value;
	});

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
		token.value = e.srcElement.value
	}

	const handleOptionChange = (value) => {
		isCustom = value === 'custom'
	}
</script>

<div class="flex flex-row gap-2">
	<Select.Root bind:value={token.value} disabled={viewModeValue}>
		<Select.Trigger class="w-[100px] disabled:opacity-1">
			<Select.Value 
				placeholder={isCustom ? 'custom' : fontWeigthValueOptions[4]}
			/>
			{#if !viewModeValue}
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
		<Input disabled={viewModeValue}
			class="h-8 w-[100px] disabled:opacity-1"
			type="text"
			bind:value={token.value}
			on:input={handleCustomInputChange}
		/>
	{/if}
</div>
