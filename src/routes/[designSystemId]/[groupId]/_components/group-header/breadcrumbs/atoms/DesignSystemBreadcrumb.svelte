<script lang="ts">
	import type { DesignSystemOverview } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Input } from '$lib/components/ui/input'
	import { Pencil, Trash } from 'lucide-svelte'
	import CommandsDropdown from '$lib/components/CommandsDropdown.svelte'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import * as Breadcrumbs from '$lib/components/breadcrumbs'
	import DesignSystemSelectDropdown from './DesignSystemSelectDropdown.svelte'

	export let activeDesignSystemIndex: number

	$: activeDesignSystem = $designSystemsOverviewsStore[
		activeDesignSystemIndex
	] as DesignSystemOverview

	let changeNameInput = false

	const toggleChangeNameInput = () => {
		changeNameInput = !changeNameInput
	}

	const deleteDesignSystem = async () => {
		await goto(`/`)
		designSystemsOverviewsStore.deleteDesignSystem(
			$page.params.designSystemId as string
		)
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
	<CommandsDropdown commands={dropdownCommands} />
	{#if changeNameInput}
		<Input
			placeholder={activeDesignSystem.name}
			on:focusout={toggleChangeNameInput}
			bind:value={$designSystemsOverviewsStore[activeDesignSystemIndex].name}
			class="h-fit px-2 py-1"
		/>
	{:else}
		<DesignSystemSelectDropdown {activeDesignSystemIndex} />
	{/if}
</Breadcrumbs.Container>
