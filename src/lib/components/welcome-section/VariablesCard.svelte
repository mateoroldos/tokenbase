<script lang="ts">
	import VariableCard from './VariableCard.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { Variable } from '$lib/interface/interface.ts'

	export let variables: Variable[]
</script>

<Card.Root class="border-none bg-slate-900 p-6 shadow-none">
	<p class="pb-3 font-mono text-sm font-medium text-slate-50">
		styles/variables.css
	</p>
	<div class="flex flex-col items-center gap-2">
		{#each variables as variable}
			<VariableCard {variable} variables={true} />
		{/each}
	</div>
</Card.Root>
