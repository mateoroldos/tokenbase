<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import * as Select from '$lib/components/ui/select'
	import { ChevronDown } from 'lucide-svelte'
	ChevronDown

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
		'black'
	]
</script>

<Select.Root bind:value={token.value}>
	<Select.Trigger class="w-[100px] ">
		<Select.Value placeholder={fontWeigthValueOptions[4]} />
		<ChevronDown class="h-3 pl-3" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each fontWeigthValueOptions as option}
				<Select.Item class="pl-4" bind:value={option} label={option}
					>{option}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input />
</Select.Root>
