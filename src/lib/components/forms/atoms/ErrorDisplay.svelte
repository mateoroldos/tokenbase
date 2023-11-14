<script lang="ts">
	import { AlertCircle } from 'lucide-svelte'

	export let form: string
</script>

<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
	<AlertCircle class="mr-1 h-3 w-3" />
	<p class="text-sm text-red-600">{form}</p>
</div>
