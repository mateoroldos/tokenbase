<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/groupsStore'
	import Input from '$lib/components/ui/input/Input.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { activeThemeIndex } from '../stores/activeThemeIndexStore'
	import { v4 as uuidv4 } from 'uuid'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { Plus, X } from 'lucide-svelte'
	import { fly } from 'svelte/transition'

	export let themes: Theme[]
	export let designSystemId: string

	let newThemeName = ''
	let showNameInput = false

	let autoSelect: boolean

	const handleShowNameInput = () => {
		showNameInput = true
		autoSelect = true
	}

	const handleHideNameInput = () => {
		autoSelect = false
		newThemeName = ''

		setTimeout(() => {
			showNameInput = false
		}, 0)
	}

	const handleAddTheme = () => {
		const themeId = uuidv4()

		designSystemsOverviewsStore.addTheme(designSystemId, newThemeName, themeId)

		designTokensGroupStore.addTheme(designSystemId, themeId)

		newThemeName = ''

		$activeThemeIndex = themes.length - 1

		handleHideNameInput()
	}
</script>

<div
	class="flex flex-row items-center rounded-md border border-slate-200 bg-slate-100"
>
	<span class="px-2 text-xs font-normal text-slate-500"> Theme </span>
	<div
		class="flex flex-row items-center gap-2 bg-slate-200 px-2 py-1 text-xs font-medium"
	>
		<div class="flex h-5 flex-row items-center gap-1">
			{#if showNameInput}
				<div in:fly|local={{ duration: 200, x: 5 }}>
					<Input
						bind:value={newThemeName}
						bind:autoSelect
						class="focus-visible:ring-offset-transp h-4 w-24 px-1 py-2 text-xs focus-visible:ring-0 focus-visible:ring-slate-200 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
						type="text"
						name="new-theme-name"
						id="new-theme-name"
					/>
				</div>
			{/if}
			{#if !showNameInput}
				<select
					class="bg-transparent"
					name="active-theme"
					id="active-theme"
					bind:value={$activeThemeIndex}
					in:fly|local={{ duration: 100, x: 5 }}
				>
					{#each themes as theme, i}
						<option value={i}>
							{theme.name}
						</option>
					{/each}
				</select>
				<button
					class="flex h-4 w-4 items-center justify-center rounded-sm bg-slate-300 p-0 text-slate-600 transition-colors hover:text-slate-700"
					on:click={handleShowNameInput}><Plus class="w-3" /></button
				>
			{:else}
				<button
					class="flex h-4 w-4 items-center justify-center rounded-sm bg-slate-200 p-0 text-slate-500 transition-colors hover:text-slate-700"
					on:click={handleHideNameInput}><X class="w-3" /></button
				>
				<button
					class="flex items-center justify-center rounded-sm bg-slate-900 px-2 py-0 font-normal text-white transition-colors"
					class:bg-slate-500={newThemeName.length === 0}
					disabled={newThemeName.length === 0}
					in:fly|local={{ duration: 200, y: 2 }}
					on:click={handleAddTheme}>Add theme</button
				>
			{/if}
		</div>
	</div>
</div>
