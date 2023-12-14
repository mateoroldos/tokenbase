<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import { Circle } from 'lucide-svelte'
	import type { Variable } from '../../../../interface'

	export let variables: boolean
	export let variable: Variable

	let background = variables ? 'bg-black' : 'bg-slate-50'
	let text = variables ? 'text-slate-50' : 'text-slate-600'
	let borderColor = variables ? 'border-slate-700' : 'border-slate-100'
</script>

<Card.Root
	class={`flex flex-row items-center px-2 py-1 rounded-md w-full ${background} ${borderColor} ${text}`}
>
	{#if variables}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-xs sm:text-sm font-bold font-mono">
			<span class="font-normal">
				{variable.text}:
			</span>
			{variable.color}
		</p>
	{:else}
		<Circle fill={variable.color} class="h-3" color="none" />
		<p class="text-sm font-medium">{variable.description}</p>
	{/if}
</Card.Root>
