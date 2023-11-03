<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/groupsStore'
	import Button from '$lib/components/ui/button/Button.svelte'
	import Input from '$lib/components/ui/input/Input.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../stores/activeThemeIndexStore'
	import { v4 as uuidv4 } from 'uuid'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'

	export let themes: Theme[]
	export let designSystemId: string

	let newThemeName: string = ''

	const handleAddTheme = () => {
		const themeId = uuidv4()

		designSystemsOverviewsStore.addTheme(designSystemId, newThemeName, themeId)

		designTokensGroupStore.addTheme(designSystemId, themeId)

		newThemeName = ''
	}
</script>

<div class="flex flex-row gap-7">
	<select name="active-theme" id="active-theme" bind:value={$activeThemeIndex}>
		{#each themes as theme, i}
			<option value={i}>
				{theme.name}
			</option>
		{/each}
		{activeThemeIndex}
	</select>
	<div class="flex flex-row gap-3">
		<Input
			bind:value={newThemeName}
			type="text"
			name="new-theme-name"
			id="new-theme-name"
		/>
		<Button on:click={handleAddTheme}>Add Theme</Button>
	</div>
</div>
