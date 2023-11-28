<script lang="ts">
	export let name: string
	export let noLink: boolean
</script>

{#if noLink}
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
