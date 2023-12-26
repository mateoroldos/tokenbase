<script lang="ts">
	import AuthFormCard from '$lib/features/auth/components/AuthFormCard.svelte'
	import GithubOAuthBtn from '$lib/features/auth/components/GithubOAuthBtn.svelte'
	import LoginForm from './login-form.svelte'
	import Separator from '$lib/components/ui/separator/Separator.svelte'

	export let data
</script>

<AuthFormCard title="Sign in to Tokenbase">
	<GithubOAuthBtn />
	<Separator />
	<LoginForm form={data.form} />
	<p class="text-xs">
		Don't have an account? <a
			href="/register"
			class="text-xs text-blue-600 hover:text-blue-800">Sign up</a
		>
	</p>
</AuthFormCard>
