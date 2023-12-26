<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { Loader2 } from 'lucide-svelte'
	import type { Readable } from 'svelte/store'

	export let submitting: Readable<boolean>
	export let variant: 'default' | 'secondary' = 'default'
</script>

<Button type="submit" on:click on:keydown disabled={$submitting} {variant}>
	{#if $submitting}
		<Loader2 class="animate-spin mr-2 w-4 h-4" />
		Loading
	{:else}
		<slot>Submit</slot>
	{/if}
</Button>
