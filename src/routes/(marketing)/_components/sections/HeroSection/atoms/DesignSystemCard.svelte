<script lang="ts">
	import VariableCard from './VariableCard.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { Variable } from '../../../../interface'

	export let variables: Variable[]
</script>

<div class="p-[1px] bg-gradient-to-r from-slate-400 to-slate-600 rounded-[9px]">
	<Card.Root class="shadow-none p-6 border-none">
		<p class="font-semibold text-sm pb-3">Your Design System</p>
		<div class="flex flex-col items-center gap-2">
			{#each variables as variable}
				<VariableCard {variable} variables={false} />
			{/each}
		</div>
	</Card.Root>
</div>
