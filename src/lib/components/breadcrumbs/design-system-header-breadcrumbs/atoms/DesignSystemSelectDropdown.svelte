<script lang="ts">
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Input } from '$lib/components/ui/input'
	import { Search } from 'lucide-svelte'
	import { Check } from 'lucide-svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import type { DivEventHandler } from 'bits-ui'

	export let activeDesignSystemIndex: number

	$: activeDesignSystem = $designSystemsOverviewsStore[
		activeDesignSystemIndex
	] as DesignSystemOverview

	let filteredSystems: any = []
	let searchTerm = ''

	const searchDesignSystems = () => {
		return (filteredSystems = $designSystemsOverviewsStore.filter(
			(designSystem) => {
				let systemName = designSystem.name.toLowerCase()
				return systemName.includes(searchTerm.toLowerCase())
			}
		))
	}

	const handleChangeDesignSystem = (e: DivEventHandler<MouseEvent>) => {
		let designSystemId = e.target?.attributes.value.nodeValue
		goto(`/workspace/${designSystemId}`)
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="text-sm font-medium"
		>{activeDesignSystem.name}</DropdownMenu.Trigger
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
			<DropdownMenu.Label class="pl-4 text-sm"
				>Design Systems</DropdownMenu.Label
			>
			{#if searchTerm && filteredSystems.length === 0}
				<p class="pl-6 text-sm">No results</p>
			{:else if filteredSystems.length > 0}
				{#each filteredSystems as designSystem}
					<div class="flex w-full flex-row">
						{#if designSystem.id === $page.params.designSystemId}
							<Check class="absolute left-2 z-10 flex h-3 w-3 self-center" />
						{/if}
						<DropdownMenu.Item
							class="min-w-full pl-4"
							on:m-click={(e) => {
								handleChangeDesignSystem(e)
							}}
							value={designSystem.id}
						>
							{designSystem.name}
						</DropdownMenu.Item>
					</div>
				{/each}
			{:else}
				{#each $designSystemsOverviewsStore as designSystem}
					<div class="flex w-full flex-row">
						{#if designSystem.id === $page.params.designSystemId}
							<Check class="absolute left-2 z-10 flex h-3 w-3 self-center" />
						{/if}
						<DropdownMenu.Item
							class="min-w-full pl-6 focus:bg-none"
							on:m-click={(e) => {
								handleChangeDesignSystem(e)
							}}
							value={designSystem.id}
						>
							{designSystem.name}
						</DropdownMenu.Item>
					</div>
				{/each}
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
