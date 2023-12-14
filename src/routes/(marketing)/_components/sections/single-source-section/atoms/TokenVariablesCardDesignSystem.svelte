<script lang="ts">
	import VariableCard from './TokenVariable.svelte'
	import * as Card from '$lib/components/ui/card'
	import type { TokenVariable } from '../TOKEN_VARIABLES'

	export let tokenVariables: TokenVariable[]
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="font-medium text-md">Tokenbase Design Sytem</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		{#each tokenVariables as variable}
			<VariableCard tokenVariable={variable} isCssVariable={false} />
		{/each}
	</Card.Content>
</Card.Root>
