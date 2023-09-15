<script lang="ts">
	import { MoreVertical } from 'lucide-svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'

	export let menuItems: { title: string; component: any; test: any }[]
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		><MoreVertical class="h-3 w-3 text-slate-600" /></DropdownMenu.Trigger
	>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			{#each menuItems as customItem}
				<DropdownMenu.Item>
					<button class="flex flex-row gap-2" on:click={customItem.test}>
						<svelte:component
							this={customItem.component}
							class="h-3 w-3 self-center text-slate-700"
						/><span class="self-center text-sm text-slate-700"
							>{customItem.title}</span
						>
					</button>
				</DropdownMenu.Item>
			{/each}</DropdownMenu.Group
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
