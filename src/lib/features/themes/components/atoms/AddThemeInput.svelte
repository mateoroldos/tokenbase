<script lang="ts">
	import { fly } from 'svelte/transition'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import Input from '$lib/components/ui/input/Input.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../../stores/activeThemeIndexStore'
	import { v4 as uuidv4 } from 'uuid'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { X } from 'lucide-svelte'
	import ThemeSelectorButton from './ThemeSelectorButton.svelte'

	export let designSystemId: string
	export let themes: Theme[]
	export let showNameInput: boolean

	let newThemeName = ''

	const handleAddTheme = () => {
		const themeId = uuidv4()

		designSystemsOverviewsStore.addTheme(designSystemId, newThemeName, themeId)

		groupsStore.addTheme(designSystemId, themeId)

		newThemeName = ''

		$activeThemeIndex = themes.length - 1

		handleHideNameInput()
	}

	const handleHideNameInput = () => {
		newThemeName = ''
		showNameInput = false
	}
</script>

<div
	in:fly|local={{ duration: 200, x: 5 }}
	class="flex flex-row items-center gap-1"
>
	<Input
		bind:value={newThemeName}
		autoSelect={true}
		class="focus-visible:ring-offset-transp h-4 w-24 px-1 py-2 text-xs focus-visible:ring-0 focus-visible:ring-slate-200 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
		type="text"
		name="new-theme-name"
		id="new-theme-name"
	/>
	<ThemeSelectorButton
		disabled={newThemeName.length === 0}
		class="px-2 text-[0.65rem]"
		on:click={handleAddTheme}
	>
		Add theme
	</ThemeSelectorButton>
	<ThemeSelectorButton
		class="bg-transparent text-slate-500 hover:text-slate-700"
		on:click={handleHideNameInput}
	>
		<X class="w-3" />
	</ThemeSelectorButton>
</div>
