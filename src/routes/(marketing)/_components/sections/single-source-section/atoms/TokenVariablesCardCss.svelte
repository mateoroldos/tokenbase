<script lang="ts">
	import VariableCard from './TokenVariable.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { TokenVariable } from '../variables'

	export let tokenVariables: TokenVariable[]
</script>

<Card.Root class="bg-black border-none text-slate-50">
	<Card.Header>
		<Card.Title class="font-medium text-md font-mono"
			>styles/variables.css</Card.Title
		>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		{#each tokenVariables as variable}
			<VariableCard tokenVariable={variable} isCssVariable={true} />
		{/each}
	</Card.Content>
</Card.Root>
