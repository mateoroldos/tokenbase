<script lang="ts">
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../../stores/activeThemeIndexStore'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { Pencil, Trash, X } from 'lucide-svelte'
	import CommandsDropdown from '$lib/components/CommandsDropdown.svelte'

	export let themes: Theme[]
	export let designSystemId: string

	export let showEditNameInput

	$: activeTheme = themes[$activeThemeIndex] as Theme
	$: activeThemeId = activeTheme.id

	const handleShowEditDesignSystemName = () => {
		showEditNameInput = true
	}

	const handleDeleteTheme = () => {
		if (themes.length > 1) {
			designSystemsOverviewsStore.deleteTheme(
				designSystemId,
				activeThemeId as string
			)

			$activeThemeIndex = 0
		}
	}

	const themeOptions = [
		{
			title: 'Edit name',
			component: Pencil,
			function: handleShowEditDesignSystemName
		},
		{
			title: 'Delete theme',
			component: Trash,
			function: handleDeleteTheme
		}
	]

	const themeOptionsWithoutDelete = themeOptions.filter(
		(option) => option.title !== 'Delete theme'
	)

	$: dropdownCommands =
		themes.length > 1 ? themeOptions : themeOptionsWithoutDelete
</script>

<CommandsDropdown commands={dropdownCommands} />
