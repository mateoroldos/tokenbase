<script lang="ts">
	import Button from '$lib/components/ui/button/Button.svelte'
	import { Github } from 'lucide-svelte'

	const handleGithubLogin = async () => {
		const github = await fetch(`/api/github`).then((res) => res.json())

		window.location.href = github
	}
</script>

<Button on:click={handleGithubLogin} class="btn btn-primary mt-4 max-w-xs">
	<Github class="h-4 w-4 mr-2" />
	Continue with Github
</Button>
