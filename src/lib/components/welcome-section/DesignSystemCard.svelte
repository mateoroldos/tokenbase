<script lang="ts">
	import type { Variable } from '$lib/interface/interface.ts'
	import VariableCard from './VariableCard.svelte'
	import * as Card from '$lib/components/ui/card'

	export let variables: Variable[]
</script>

<div class="rounded-[9px] bg-gradient-to-r from-slate-400 to-slate-600 p-[1px]">
	<Card.Root class="border-none p-6 shadow-none">
		<p class="pb-3 text-sm font-semibold">Your Design System</p>
		<div class="flex flex-col items-center gap-2">
			{#each variables as variable}
				<VariableCard {variable} variables={false} />
			{/each}
		</div>
	</Card.Root>
</div>
