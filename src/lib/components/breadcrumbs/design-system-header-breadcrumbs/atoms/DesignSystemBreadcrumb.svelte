<script lang="ts">
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Input } from '$lib/components/ui/input'
	import { Pencil, Trash } from 'lucide-svelte'
	import CommandsDropdown from '$lib/components/CommandsDropdown.svelte'
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import DesignSystemSelectDropdown from './DesignSystemSelectDropdown.svelte'
	import type { DesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	export let activeDesignSystemIndex: number
	export let activeDesignSystemOverview: DesignSystemOverview
	export let designSystemsOverviewsStore: DesignSystemsOverviewsStore | null =
		null
	export let viewMode = false
	export let activeWorkspaceId: string

	let changeNameInput = false

	const toggleChangeNameInput = () => {
		changeNameInput = !changeNameInput
	}

	const deleteDesignSystem = async () => {
		if (designSystemsOverviewsStore) {
			await goto(`/workspace`)
			designSystemsOverviewsStore.deleteDesignSystem(
				$page.params.designSystemId as string
			)
		}
	}

	let dropdownCommands = [
		{ title: 'Edit name', component: Pencil, function: toggleChangeNameInput },
		{
			title: 'Delete System',
			component: Trash,
			function: deleteDesignSystem
		}
	]
</script>

<Breadcrumbs.Container>
	{#if !viewMode}
		<CommandsDropdown commands={dropdownCommands} />
	{/if}
	{#if changeNameInput && designSystemsOverviewsStore !== null}
		<Input
			placeholder={activeDesignSystemOverview.name}
			on:focusout={toggleChangeNameInput}
			bind:value={$designSystemsOverviewsStore[activeDesignSystemIndex].name}
			class="h-fit px-2 py-1"
		/>
	{:else if designSystemsOverviewsStore}
		<DesignSystemSelectDropdown {activeDesignSystemIndex} {activeWorkspaceId} />
	{:else}
		<span>Design System</span>
	{/if}
</Breadcrumbs.Container>
