<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '$lib/features/token-groups-tree/types/groups-tree'
	import { ChevronRight, Trash, Plus, MoreHorizontal } from 'lucide-svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import type { createPreviewGroupsStore } from './previewGroups'
	import { groupId } from './groupId'

	export let node: GroupsTree
	export let nestNumber: number = 0

	let isOpen = false
	let hover = false

	const previewDesignTokensGroupStore: ReturnType<
		typeof createPreviewGroupsStore
	> = getContext('previewDesignTokensGroupStore')

	$: isActive = $groupId === node.group?.id
	//VER PORQUE NO FUNCIONA EL isActive

	const toggleOpen = () => {
		isOpen = !isOpen
	}

	const handleClick = (event: Event) => {
		event.stopPropagation()
		toggleOpen()
	}

	onMount(() => {
		if (node.children.length > 0) {
			isOpen = true
		}
	})

	function handleGroupId() {
		groupId.set(node.group?.id || '')
	}

	let open: boolean

	$: showButtons = hover || open

	$: padding = `${nestNumber * 15}px`
</script>

<div>
	<div
		class={`flex flex-row items-center justify-between rounded-md px-1 py-1 text-slate-400 transition-all hover:bg-slate-100`}
		role="button"
		tabindex="0"
		on:click={handleGroupId}
		style={nestNumber > 0 ? `padding-left: ${padding}` : ''}
	>
		<div class="flex flex-row items-center gap-1">
			<div
				class="cursor-pointer transition-transform"
				class:rotate-90={isOpen}
				on:click|preventDefault={handleClick}
				on:keypress|preventDefault={handleClick}
				tabindex="0"
				role="button"
			>
				<ChevronRight class="h-3 w-3" />
			</div>
			{#if node.group?.name === ''}
				<span class="text-sm font-medium text-slate-600">Untitled</span>
			{:else}
				<span
					class:text-slate-900={isActive}
					class="text-sm font-medium text-slate-400">{node.group?.name}</span
				>
			{/if}
		</div>
		<div class="flex flex-row">
			{#if showButtons}
				<DropdownMenu.Root bind:open>
					<DropdownMenu.Trigger
						let:builder
						class="rounded-sm p-[2px] hover:bg-slate-200"
						><MoreHorizontal class="h-4 w-4" />
					</DropdownMenu.Trigger>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
	{#if isOpen}
		<div>
			{#if node.children.length > 0}
				{#each node.children as childNode}
					<svelte:self node={childNode} nestNumber={nestNumber + 1} />
				{/each}
			{:else}
				<span class="text-xs text-slate-400" style={`padding-left: ${padding}`}
					>Group has no children</span
				>
			{/if}
		</div>
	{/if}
</div>
