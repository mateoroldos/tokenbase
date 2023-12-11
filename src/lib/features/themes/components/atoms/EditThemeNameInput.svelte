<script lang="ts">
	import { fly } from 'svelte/transition'
	import Input from '$lib/components/ui/input/Input.svelte'
	import { Check } from 'lucide-svelte'
	import ThemeSelectorButton from './ThemeSelectorButton.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	export let theme: Theme
	export let showEditNameInput: boolean

	const handleHideEditDesignSystemName = () => {
		showEditNameInput = false
	}
</script>

<div
	in:fly|local={{ duration: 200, x: 5 }}
	class="flex flex-row items-center gap-1"
>
	<Input
		bind:value={theme.name}
		autoSelect={true}
		class="focus-visible:ring-offset-transp h-4 w-24 px-1 py-2 text-xs focus-visible:ring-0 focus-visible:ring-slate-200 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
		type="text"
		name="new-theme-name"
		id="new-theme-name"
	/>
	<ThemeSelectorButton
		disabled={theme.name.length === 0}
		on:click={handleHideEditDesignSystemName}
	>
		<Check class="h-3 w-3" />
	</ThemeSelectorButton>
</div>
