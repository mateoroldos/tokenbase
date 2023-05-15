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
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			bind:value={dimensionValue}
		/>
	</div>
	<div>
		<select
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
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
