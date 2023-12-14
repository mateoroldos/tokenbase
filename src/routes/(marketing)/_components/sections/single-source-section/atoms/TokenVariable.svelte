<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import { Circle } from 'lucide-svelte'
	import type { TokenVariable } from '../TOKEN_VARIABLES'

	export let isCssVariable: boolean
	export let tokenVariable: TokenVariable

	let background = isCssVariable ? 'bg-black' : 'bg-slate-50'
	let text = isCssVariable ? 'text-slate-50' : 'text-slate-600'
	let borderColor = isCssVariable ? 'border-slate-700' : 'border-slate-100'
</script>

<Card.Root
	class={`flex flex-row items-center px-2 py-1 rounded-md w-full ${background} ${borderColor} ${text}`}
>
	{#if isCssVariable}
		<Circle fill={tokenVariable.color} class="h-3" color="none" />
		<p class="text-xs sm:text-sm font-bold font-mono">
			<span class="font-normal">
				{tokenVariable.text}:
			</span>
			{tokenVariable.color}
		</p>
	{:else}
		<Circle fill={tokenVariable.color} class="h-3" color="none" />
		<p class="text-sm font-medium">{tokenVariable.description}</p>
	{/if}
</Card.Root>
