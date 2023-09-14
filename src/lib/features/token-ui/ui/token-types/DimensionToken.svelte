<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import * as Select from '$lib/components/ui/select'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import dimensionSuite from '$lib/features/token-management/dimension/dimensionSuite'

	export let token: IToken<'dimension'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = dimensionSuite(target.value, name)
	}

	let res = dimensionSuite.get()

	let options = ['px', 'rem']
</script>

<div class="flex gap-3">
	<div>
		<Input
			name="dimension"
			class="h-8 w-[80px] "
			type="number"
			{...isAlias ? { disabled: true } : {}}
			on:input={handleChange}
			bind:value={token.value.value}
		/>
	</div>
	<div class="flex items-center">
		<Select.Root bind:value={token.value.unit}>
			<Select.Trigger
				class="h-8 w-[60px] "
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
