<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import * as Select from '$lib/components/ui/select'
	import { ChevronDown } from 'lucide-svelte'
	import Input from '$lib/components/ui/input/input.svelte'

	export let token: IToken<'fontWeight'>

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
		console.log(e.srcElement.value)
		console.log(token.value)
	}

	const handleOptionChange = (value) => {
		isCustom = value === 'custom'
	}
</script>

<div class="flex flex-row gap-2">
	<Select.Root bind:value={token.value}>
		<Select.Trigger class="w-[100px] ">
			<Select.Value
				placeholder={isCustom ? 'custom' : fontWeigthValueOptions[4]}
			/>
			<ChevronDown class="h-3 pl-3" />
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
			class="h-8 w-[100px]"
			type="text"
			bind:value={token.value}
			on:input={handleCustomInputChange}
		/>
	{/if}
</div>
