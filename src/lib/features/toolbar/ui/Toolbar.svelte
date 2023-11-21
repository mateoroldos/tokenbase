<script lang="ts">
	import { viewMode } from '$lib/features/viewMode/stores/viewMode'
	import GenerateShadesButton from '../tools/color-shade-generator/GenerateShadesButton.svelte'
	import DeleteTokensButton from '../tools/delete-tokens/DeleteTokensButton.svelte'
	import ViewModeSwitch from '../tools/view-mode/ViewModeSwitch.svelte'

	$: {
		if ($viewMode) {
			viewMode.set(true)
		} else {
			viewMode.set(false)
		}
	}
</script>

<div class="flex flex-row items-center gap-6">
	<ViewModeSwitch />
	<GenerateShadesButton />
	<DeleteTokensButton />
</div>
