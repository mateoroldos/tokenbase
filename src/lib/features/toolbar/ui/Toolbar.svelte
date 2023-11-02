<script lang="ts">
	import { viewMode } from '$lib/features/stores/viewMode';
	import { Switch } from "$lib/components/ui/switch";
	import GenerateShadesButton from '../tools/color-shade-generator/GenerateShadesButton.svelte'
	import DeleteTokensButton from '../tools/delete-tokens/DeleteTokensButton.svelte'

	let switchValue: boolean;
	viewMode.subscribe(value => {
		switchValue = value;
	});
	$: {
		if (switchValue) {
			viewMode.set(true);
		} else {
			viewMode.set(false);
		}
	}
</script>

<div class="flex flex-row gap-6 items-center">
	<Switch bind:checked={switchValue}/>
	<GenerateShadesButton />
	<DeleteTokensButton />
</div>
