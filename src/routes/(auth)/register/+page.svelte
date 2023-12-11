<script lang="ts">
	import AuthFormCard from '$lib/features/auth/components/AuthFormCard.svelte'
	import RegisterForm from './register-form.svelte'

	export let data
</script>

<AuthFormCard title="Create account">
	<RegisterForm form={data.form} />
	<p class="text-xs">
		Already have an account? <a
			href="/login"
			class="text-xs text-blue-600 hover:text-blue-800">Sign in</a
		>
	</p>
</AuthFormCard>
