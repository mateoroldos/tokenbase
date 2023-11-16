<script lang="ts">
	import { viewMode } from '$lib/features/viewMode/stores/viewMode';
	import { Switch } from "$lib/components/ui/switch";
	import GenerateShadesButton from '../tools/color-shade-generator/GenerateShadesButton.svelte'
	import DeleteTokensButton from '../tools/delete-tokens/DeleteTokensButton.svelte'
	import { preview } from '$lib/features/viewMode/stores/preview';
	import Button from '$lib/components/ui/button/Button.svelte';
	import ImportDesignSystem from '../tools/import-design-system/ImportDesignSystem.svelte';
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte';
	import ViewModeSwitch from '../tools/view-mode/ViewModeSwitch.svelte';
	
	$: {
		if ($viewMode) {
			viewMode.set(true);
		} else {
			viewMode.set(false);
		}
	}
</script>

<div class="flex flex-row gap-6 items-center">
	<ViewModeSwitch/>
	<GenerateShadesButton />
	<DeleteTokensButton />
</div>
