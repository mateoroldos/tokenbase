<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { X } from 'lucide-svelte'
	import { aliasMode } from '../../stores/aliasModeStore'
</script>

<Button
	size="sm"
	on:click={() => ($aliasMode = false)}
	class="bg-purple-700 text-xs hover:bg-purple-900"
>
	<X class="mr-1 h-4 w-4" />
	Close Alias Mode</Button
>
