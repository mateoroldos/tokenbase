<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte'

	export let showPassword: boolean
	export let togglePasswordVisibility: () => void
</script>

<button
	type="button"
	class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
	on:click={togglePasswordVisibility}
>
	{#if showPassword}
		<EyeOff class="h-4 w-4" />
	{:else}
		<Eye class="h-4 w-4" />
	{/if}
</button>
