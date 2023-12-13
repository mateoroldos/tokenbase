<script lang="ts">
	import VariableCard from './VariableCard.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { Variable } from '../../../../interface'

	export let variables: Variable[]
</script>

<Card.Root class="shadow-none p-6 border-none bg-slate-900">
	<p class="font-medium font-mono text-sm pb-3 text-slate-50">
		styles/variables.css
	</p>
	<div class="flex flex-col items-center gap-2">
		{#each variables as variable}
			<VariableCard {variable} variables={true} />
		{/each}
	</div>
</Card.Root>
