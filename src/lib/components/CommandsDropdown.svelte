<script lang="ts">
	import { MoreVertical } from 'lucide-svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'

	export let commands: {
		title: string
		component: ConstructorOfATypedSvelteComponent
		function: () => any
	}[]

	export let open = false
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger>
		<slot>
			<MoreVertical class="h-3 w-3 text-slate-600" />
		</slot>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			{#each commands as command}
				<DropdownMenu.Item>
					<button class="flex flex-row gap-2" on:click={command.function}>
						<svelte:component
							this={command.component}
							class="h-3 w-3 self-center text-slate-700"
						/><span class="self-center text-sm text-slate-700"
							>{command.title}</span
						>
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
