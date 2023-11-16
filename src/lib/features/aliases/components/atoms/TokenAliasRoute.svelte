<script lang="ts">
	import { ChevronRight } from 'lucide-svelte'
	import { page } from '$app/stores'

	export let aliasRouteAndIdArray: {
		name: string
		id: string
	}[]

	let expanded = false
</script>

<div
	class="flex h-7 flex-row items-center gap-[0.18rem] rounded-md border border-purple-200 bg-purple-50 pl-1 pr-3 text-xs text-purple-700 transition-colors"
>
	<slot />
	{#each aliasRouteAndIdArray as routeElement, i (routeElement.id)}
		{#if i === aliasRouteAndIdArray.length - 1 || i === aliasRouteAndIdArray.length - 2 || expanded}
			{#if i === aliasRouteAndIdArray.length - 1}
				<span
					class="max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap"
				>
					{routeElement.name}
				</span>
			{:else}
				<a
					href={`/${$page.params.designSystemId}/${routeElement.id}`}
					class="max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
				>
					{routeElement.name}
				</a>
			{/if}
			{#if i !== aliasRouteAndIdArray.length - 1}
				<ChevronRight class="w-3" />
			{/if}
		{:else if expanded || i === 0}
			<button
				on:click|preventDefault|stopPropagation={() => (expanded = true)}
				class="rounded-sm px-1 transition-colors hover:bg-purple-100"
			>
				...
			</button>
			<ChevronRight class="w-3" />
		{/if}
	{/each}
</div>
