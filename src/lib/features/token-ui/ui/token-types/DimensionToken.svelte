<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'dimension'>
	let options = ['px', 'rem']
</script>

<div class="flex gap-6">
	<div>
		<input
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			type="number"
			bind:value={token.value.value}
		/>
	</div>
	<div>
		<select
			class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
			bind:value={token.value.value.unit}
		>
			{#each options as option}
				<option value={option}>
					{option}
				</option>
			{/each}
		</select>
	</div>
</div>
