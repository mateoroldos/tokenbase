<script lang="ts">
	export let title: string
	export let description: string | undefined = undefined
</script>

<div class="flex flex-col gap-4 items-center">
	<h1 class="text-center font-medium text-5xl">
		{title}
	</h1>
	{#if description}
		<span class="text-center text-xl text-slate-500">
			{description}
		</span>
	{/if}
</div>
