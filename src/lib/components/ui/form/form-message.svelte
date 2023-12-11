<script lang="ts">
	import { getForm } from 'formsnap'

	const { message } = getForm()
</script>

{#if $message}
	<small class:text-destructive={$message.type === 'error'}
		>{$message.text}</small
	>
{/if}
