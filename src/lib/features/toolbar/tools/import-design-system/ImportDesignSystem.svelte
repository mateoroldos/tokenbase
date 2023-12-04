<script lang="ts">
	import { preview } from '$lib/features/view-mode/stores/preview'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'
	import Button from '$lib/components/ui/button/Button.svelte'
	import { buttonVariants } from '$lib/components/ui/button'
	function handleClickButton() {
		preview.set(false)
		viewMode.set(false)
	}
</script>

<Button on:click={handleClickButton} class={buttonVariants({ size: 'sm' })}
	>Import</Button
>
