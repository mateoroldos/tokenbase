<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'dimension'>

	let dimensionValue: number
	let dimensionUnit: 'px' | 'em' | 'rem'

	let options = [
		{
			value: 'px',
			text: 'px'
		},
		{
			value: 'em',
			text: 'em'
		},
		{
			value: 'rem',
			text: 'rem'
		}
	]

	$: token.value = `${dimensionValue}${dimensionUnit}`
</script>

<div class="flex gap-6">
	<div>
		<input
			class="border border-solid border-black"
			type="number"
			bind:value={dimensionValue}
		/>
	</div>
	<div>
		<select
			class="border border-solid border-black"
			bind:value={dimensionUnit}
		>
			{#each options as option}
				<option value={option.value}>
					{option.text}
				</option>
			{/each}
		</select>
	</div>
</div>
