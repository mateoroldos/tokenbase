<script lang="ts">
	import VariableCard from './VariableCard.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { Variable } from '../../../../interface'

	export let variables: Variable[]
</script>

<Card.Root class="bg-black border-none text-slate-50">
	<Card.Header>
		<Card.Title class="font-medium text-md font-mono"
			>styles/variables.css</Card.Title
		>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		{#each variables as variable}
			<VariableCard {variable} variables={true} />
		{/each}
	</Card.Content>
</Card.Root>
