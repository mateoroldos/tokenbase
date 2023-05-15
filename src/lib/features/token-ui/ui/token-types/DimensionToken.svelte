<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'dimension'>

	let dimensionValue: number
	let dimensionUnit: 'px' | 'rem'

	let options = ['px', 'rem']

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
				<option value={option}>
					{option}
				</option>
			{/each}
		</select>
	</div>
</div>
