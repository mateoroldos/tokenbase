<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import { Input } from '$lib/components/ui/input'
	import { Search } from 'lucide-svelte'
	import { Check } from 'lucide-svelte'
	import { Pencil, Trash } from 'lucide-svelte'
	import DropDown from '$lib/components/DropDown.svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: groupId = $page.params.groupId
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	const handleUnselectNameInput = () => {
		if (groupId) {
			if (
				$designTokensGroupStore[groupIndex]!.name === undefined ||
				$designTokensGroupStore[groupIndex]!.name === ''
			) {
				$designTokensGroupStore[groupIndex]!.name = 'Untitled'
			}
		}
	}

	let changeNameInput = false

	const toggleChangeNameInput = () => {
		changeNameInput = !changeNameInput
	}

	const handleChangeDesignSystem = (e: Event) => {
		let designSystemId = e.target?.attributes.value.nodeValue
		goto(`/${designSystemId}`)
	}

	let filteredSystems: any = []

	let searchTerm = ''

	const searchDesignSystems = () => {
		return (filteredSystems = $tokenBaseMainStore.filter((designSystem) => {
			let systemName = designSystem.name.toLowerCase()
			return systemName.includes(searchTerm.toLowerCase())
		}))
	}

	const deleteDesignSystem = async () => {
		await goto(`/`)
		tokenBaseMainStore.deleteDesignSystem($page.params.designSystemId)
	}

	let customMenuItems = [
		{ title: 'Edit name', component: Pencil, test: toggleChangeNameInput },
		{
			title: 'Delete System',
			component: Trash,
			test: deleteDesignSystem
		}
	]

	let designSystemItems = [
		{ title: 'Edit name', component: Pencil, test: toggleChangeNameInput },
		{
			title: 'Delete System',
			component: Trash,
			test: deleteDesignSystem
		}
	]
</script>

<div class="flex flex-row items-center">
	<DropDown menuItems={customMenuItems} />
	{#if changeNameInput}
		<Input
			placeholder={$tokenBaseMainStore[activeDesignSystemIndex]?.name}
			on:focusout={toggleChangeNameInput}
			bind:value={$tokenBaseMainStore[activeDesignSystemIndex].name}
			class="h-fit px-2 py-1"
		/>
	{:else}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				>{$tokenBaseMainStore[activeDesignSystemIndex]
					?.name}</DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<div class="flex flex-row">
						<Search class="ml-3 mr-0 flex h-4 w-4 self-center" />
						<Input
							class="focus:ring-3 focus-visible:ring-3 border-none "
							placeholder="Search system..."
							on:input={searchDesignSystems}
							bind:value={searchTerm}
							on:keydown={(e) => e.stopPropagation()}
						/>
					</div>

					<DropdownMenu.Label class="pl-4">Design Systems</DropdownMenu.Label>
					{#if searchTerm && filteredSystems.length === 0}
						<p class="pl-6 text-sm">No results</p>
					{:else if filteredSystems.length > 0}
						{#each filteredSystems as system}
							<div class="flex w-full flex-row">
								{#if system.id === $page.params.designSystemId}
									<Check
										class="absolute left-2 z-10 flex h-3 w-3 self-center"
									/>
								{/if}
								<DropdownMenu.Item
									class="min-w-full pl-4"
									on:m-click={(e) => {
										handleChangeDesignSystem(e)
									}}
									value={system.id}
								>
									{system.name}
								</DropdownMenu.Item>
							</div>
						{/each}
					{:else}
						{#each $tokenBaseMainStore as system}
							<div class="flex w-full flex-row">
								{#if system.id === $page.params.designSystemId}
									<Check
										class="absolute left-2 z-10 flex h-3 w-3 self-center"
									/>
								{/if}
								<DropdownMenu.Item
									class="min-w-full pl-6 focus:bg-none"
									on:m-click={(e) => {
										handleChangeDesignSystem(e)
									}}
									value={system.id}
								>
									{system.name}
								</DropdownMenu.Item>
							</div>
						{/each}
					{/if}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>
