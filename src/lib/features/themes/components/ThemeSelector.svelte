<script lang="ts">
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../stores/activeThemeIndexStore'
	import { Plus } from 'lucide-svelte'
	import EditThemeNameInput from './atoms/EditThemeNameInput.svelte'
	import AddThemeInput from './atoms/AddThemeInput.svelte'
	import ThemeSelectorDropdown from './atoms/ThemeSelectorDropdown.svelte'
	import ThemeOptionsDropdown from './atoms/ThemeOptionsDropdown.svelte'
	import ThemeSelectorContainer from './atoms/ThemeSelectorContainer.svelte'

	export let themes: Theme[]
	export let designSystemId: string
	export let viewMode: boolean = false

	let showNameInput = false
	let showEditNameInput = false

	$: activeTheme = themes[$activeThemeIndex] as Theme

	const handleShowNameInput = () => {
		showNameInput = true
	}
</script>

{#if themes[$activeThemeIndex] && themes[$activeThemeIndex]?.id}
	<ThemeSelectorContainer>
		{#if showNameInput && !viewMode}
			<AddThemeInput {designSystemId} {themes} bind:showNameInput />
		{:else if showEditNameInput && !viewMode}
			<EditThemeNameInput theme={activeTheme} bind:showEditNameInput />
		{:else}
			{#if !viewMode}
				<ThemeOptionsDropdown
					bind:themes
					bind:designSystemId
					bind:showEditNameInput
				/>
			{/if}
			<ThemeSelectorDropdown {themes} />
			{#if !viewMode}
				<button
					class="flex h-4 w-4 items-center justify-center rounded-sm bg-slate-300 p-0 text-slate-600 transition-colors hover:text-slate-700"
					on:click={handleShowNameInput}><Plus class="h-3 w-3" /></button
				>
			{/if}
		{/if}
	</ThemeSelectorContainer>
{/if}
