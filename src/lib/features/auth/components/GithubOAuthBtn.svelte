<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { Github, Loader2 } from 'lucide-svelte'

	let loading = false

	const handleGithubLogin = () => {
		loading = true
		window.location.href = '/login/github'
	}
</script>

<Button on:click={handleGithubLogin} disabled={loading}>
	{#if loading}
		<Loader2 class="animate-spin mr-2 w-4 h-4" />
		Signing in...
	{:else}
		<Github class="h-4 w-4 mr-2" />
		Sign in with Github
	{/if}
</Button>
