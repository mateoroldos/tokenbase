<script lang="ts">
	import { goto } from '$app/navigation'
	import { getContext, onMount } from 'svelte'
	import type { GroupsTree } from '../../types/groups-tree'
	import { ChevronRight, Trash, Plus, MoreHorizontal } from 'lucide-svelte'
	import { page } from '$app/stores'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'

	export let node: GroupsTree
	export let nestNumber: number = 0

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	$: groupId = $page.params.groupId as string

	$: isActive = groupId === node.group?.id

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
		designTokensGroupStore.addGroup('', undefined, node.group?.id)

		goto(
			`/${$page.params.designSystemId}/${
				$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id
			}`
		)
		openToggle()
	}

	const handleDeleteGroup = async () => {
		await goto(`/${$page.params.designSystemId}`)
		designTokensGroupStore.deleteGroup(node.group?.id)
	}

	let customMenuItems = [
		{ title: 'Add a group', component: Plus, test: handleAddNewGroup },
		{ title: 'Delete a group', component: Trash, test: handleDeleteGroup }
	]

	let open: boolean

	$: showButtons = hover || open

	$: padding = `${nestNumber * 15}px`
</script>

<div>
	<a
		class={`flex flex-row items-center justify-between rounded-md px-1 py-1 text-slate-400 transition-all hover:bg-slate-100`}
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
		role="button"
		tabindex="0"
		href={`/${$page.params.designSystemId}/${node.group?.id}`}
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
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Actions</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#each customMenuItems as customItem}
								<DropdownMenu.Item>
									<button
										class="flex flex-row gap-2"
										on:click={customItem.test}
									>
										<svelte:component
											this={customItem.component}
											class="h-3 w-3 self-center"
										/><span class="self-center">{customItem.title}</span>
									</button>
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
			{#if showButtons}
				<button
					on:click|preventDefault={handleAddNewGroup}
					class="rounded-sm p-[2px] hover:bg-slate-200"
				>
					<Plus class="h-4 w-4" />
				</button>
			{/if}
		</div>
	</a>
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
