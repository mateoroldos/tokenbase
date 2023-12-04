<script lang="ts">
	import { Box, Boxes } from 'lucide-svelte'
	import type { TemplateType } from './../../types/template-type.type'

	export let templateType: TemplateType
</script>

<div
	class="flex flex-row items-center rounded-md text-xs font-medium text-slate-400"
>
	{#if templateType === 'groups'}
		<Box class="mr-1 h-3 w-3" />
		<span>Group template</span>
	{:else if templateType === 'tokens'}
		<Boxes class="mr-1 h-3 w-3" />
		<span>Tokens Template</span>
	{/if}
</div>
