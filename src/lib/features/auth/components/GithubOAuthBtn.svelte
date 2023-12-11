<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { Github } from 'lucide-svelte'

	const handleGithubLogin = () => {
		window.location.href = '/login/github'
	}
</script>

<Button on:click={handleGithubLogin}>
	<Github class="h-4 w-4 mr-2" />
	Sign in with Github
</Button>
