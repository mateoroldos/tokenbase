<script lang="ts">
	import { MoreVertical } from 'lucide-svelte'

	let menuOpen = false

	let hover: boolean = false

	export let menuItems: { title: string; component: any; test: any }[]
</script>

<div class="absolute z-50 inline-block">
	<button
		on:click={() => (menuOpen = !menuOpen)}
		class="text-gray-500 hover:text-black"
	>
		<MoreVertical class="h-4 w-4 {menuOpen ? 'hidden' : 'block'}" />
	</button>

	<div
		id="myDropdown"
		class=" rounded border bg-white p-2 shadow-md {menuOpen
			? 'block'
			: 'hidden'}"
	>
		<div class="flex flex-col gap-3">
			{#each menuItems as { title, component, test }}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="flex flex-row gap-3 p-2 hover:rounded-sm hover:bg-slate-100"
					on:click={() => {
						test()
					}}
				>
					<svelte:component
						this={component}
						class=" flex h-3 w-3 {title === 'Delete a group'
							? 'stroke-red-500'
							: 'text-slate-400'} text-center align-bottom text-xs text-slate-400  "
					/>
					<option
						value={title}
						class=" flex align-middle text-xs {title === 'Delete a group'
							? 'text-red-500'
							: 'text-slate-400'} {hover ? 'text-slate-400' : ''} "
						>{title}</option
					>
				</div>
			{/each}
		</div>
	</div>
</div>
