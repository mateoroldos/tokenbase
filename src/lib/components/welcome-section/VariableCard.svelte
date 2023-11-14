<script lang="ts">
	import type { Variable } from '$lib/interface/interface'
	import * as Card from '$lib/components/ui/card'
	import { Circle } from 'lucide-svelte'

	export let variables: boolean
	export let variable: Variable
</script>

<Card.Root class="flex w-full flex-row items-center rounded-full px-2 py-1">
	{#if variables}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-xs font-medium sm:text-sm">
			<span class="font-normal text-slate-600">
				{variable.text}:
			</span>
			{variable.color}
		</p>
	{:else}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-sm font-medium">{variable.description}</p>
	{/if}
</Card.Root>
