<script lang="ts">
	export let name: string
	export let lastItem: string
</script>

{#if lastItem}
	<span class="text-sm font-medium text-slate-700">
		{name}
	</span>
{:else}
	<button
		on:click
		class="text-sm font-medium text-slate-400 transition-colors hover:text-slate-500"
	>
		{name}
	</button>
{/if}
