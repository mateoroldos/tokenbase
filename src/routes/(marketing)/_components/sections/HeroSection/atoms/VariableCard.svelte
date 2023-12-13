<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import { Circle } from 'lucide-svelte'
	import type { Variable } from '../../../../interface'

	export let variables: boolean
	export let variable: Variable
</script>

<Card.Root class="flex flex-row items-center px-2 py-1 rounded-full w-full">
	{#if variables}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-xs sm:text-sm font-medium">
			<span class="text-slate-600 font-normal">
				{variable.text}:
			</span>
			{variable.color}
		</p>
	{:else}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-sm font-medium">{variable.description}</p>
	{/if}
</Card.Root>
