<script lang="ts">
	import { AlertCircle } from 'lucide-svelte'
	import { fly } from 'svelte/transition'

	export let message: string
</script>

<span
	class="text-red-600 text-sm flex flex-row gap-1 items-center"
	in:fly|local={{ y: -10, duration: 100 }}
>
	<AlertCircle class="w-4" />
	{message}
</span>
