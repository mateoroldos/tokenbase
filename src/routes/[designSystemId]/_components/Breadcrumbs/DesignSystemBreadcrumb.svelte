<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input'
	import { Search } from 'lucide-svelte'
	import { Check } from 'lucide-svelte'
	import { Pencil, Trash } from 'lucide-svelte'
	import DropDown from '$lib/components/DropDown.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

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
		let designSystemId = (e.target?.dataset.value).replace(/"/g, '')
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
		<Select.Root>
			<Select.Trigger class="focus:ring-3 w-fit border-none p-0 pl-1">
				<Select.Value
					class="font-medium"
					placeholder={$tokenBaseMainStore[activeDesignSystemIndex]?.name}
				/>
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
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
					<Select.Separator />
					<Select.Label class="pl-6">Design Systems</Select.Label>
					{#if searchTerm && filteredSystems.length === 0}
						<p class="pl-6 text-sm">No results</p>
					{:else if filteredSystems.length > 0}
						{#each filteredSystems as system}
							<div class="flex flex-row">
								{#if system.id === $page.params.designSystemId}
									<Check
										class="absolute left-2 z-10 flex h-3 w-3 self-center"
									/>
								{/if}
								<Select.Item
									class="pl-6"
									on:m-click={(e) => {
										handleChangeDesignSystem(e)
									}}
									value={system.id}
								>
									{system.name}
								</Select.Item>
							</div>
						{/each}
					{:else}
						{#each $tokenBaseMainStore as system}
							<div class="flex flex-row">
								{#if system.id === $page.params.designSystemId}
									<Check
										class="absolute left-2 z-10 flex h-3 w-3 self-center"
									/>
								{/if}
								<Select.Item
									class="pl-6 focus:bg-none"
									on:m-click={(e) => {
										handleChangeDesignSystem(e)
									}}
									value={system.id}
								>
									{system.name}
								</Select.Item>
							</div>
						{/each}
					{/if}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	{/if}
</div>
