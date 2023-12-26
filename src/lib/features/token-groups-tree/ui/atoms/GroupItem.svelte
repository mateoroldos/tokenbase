<script lang="ts">
	import { goto } from '$app/navigation'
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '../../types/groups-tree'
	import { ChevronRight, Trash, Plus, MoreHorizontal } from 'lucide-svelte'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import type { Readable, Writable } from 'svelte/store'
	import { page } from '$app/stores'
	import CommandsDropdown from '$lib/components/CommandsDropdown.svelte'
	import { v4 as uuidv4 } from 'uuid'

	export let node: GroupsTree
	export let nestNumber: number = 0
	export let previewStore: null | Writable<{
		activeGroupId: string
	}> = null
	export let viewMode = false

	$: activeGroupId =
		$previewStore !== null && $previewStore !== undefined
			? $previewStore.activeGroupId
			: $page.params.groupId

	const activeDesignSystemId: Readable<string> = getContext(
		'activeDesignSystemId'
	)

	$: isActive = activeGroupId === node.group?.id

	let isOpen = false
	let hover = false

	const toggleOpen = () => {
		isOpen = !isOpen
	}

	const openToggle = () => {
		isOpen = true
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

	const handleAddNewGroup = () => {
		const id = uuidv4()

		groupsStore.addGroup('', node.group?.id, id)

		setTimeout(() => {
			goto(`/workspace/${$activeDesignSystemId}/${id}`)
			openToggle()
		}, 100)
	}

	const handleDeleteGroup = async () => {
		await goto(`/workspace/${$activeDesignSystemId}`)
		groupsStore.deleteGroup(node.group?.id as string)
	}

	const handleChangeGroup = () => {
		if ($previewStore) {
			$previewStore.activeGroupId = node.group?.id as string
		} else {
			goto(`/workspace/${$activeDesignSystemId}/${node.group?.id}`)
		}
	}

	let commands = [
		{ title: 'Add a group', component: Plus, function: handleAddNewGroup },
		{ title: 'Delete a group', component: Trash, function: handleDeleteGroup }
	]

	let open: boolean

	$: showButtons = (hover || open) && !viewMode

	$: padding = `${nestNumber * 15}px`
</script>

<div>
	<div
		class={`flex flex-row items-center justify-between rounded-md px-1 py-1 text-slate-400 transition-all hover:bg-slate-100`}
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
		on:click={handleChangeGroup}
		on:keydown={handleChangeGroup}
		role="button"
		tabindex="0"
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
				<CommandsDropdown {commands} bind:open>
					<MoreHorizontal
						class="h-4 w-4 rounded-sm p-[1px] hover:bg-slate-200"
					/>
				</CommandsDropdown>
			{/if}
			{#if showButtons}
				<button
					on:click|preventDefault={handleAddNewGroup}
					class="rounded-sm p-[1px] hover:bg-slate-200"
				>
					<Plus class="h-4 w-4" />
				</button>
			{/if}
		</div>
	</div>
	{#if isOpen}
		<div>
			{#if node.children.length > 0}
				{#each node.children as childNode}
					<svelte:self
						node={childNode}
						nestNumber={nestNumber + 1}
						{previewStore}
						{viewMode}
					/>
				{/each}
			{:else}
				<span class="text-xs text-slate-400" style={`padding-left: ${padding}`}
					>Group has no children</span
				>
			{/if}
		</div>
	{/if}
</div>
