<script lang="ts">
	import { Workflow } from 'lucide-svelte'

	export let tokenDependencies: string[][]
</script>

<div
	class="flex h-7 flex-row items-center gap-1 rounded-md border border-purple-200 bg-purple-50 px-2 text-xs text-purple-600"
>
	<Workflow class="h-4 w-4 text-purple-600" />
	<span>
		{tokenDependencies.length}
	</span>
	<span>
		{#if tokenDependencies.length === 1}
			Dependency
		{:else}
			Dependencies
		{/if}
	</span>
</div>
