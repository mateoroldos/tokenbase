<script lang="ts">
	import AuthFormCard from '$lib/features/auth/components/AuthFormCard.svelte'
	import PasswordResetForm from './password-reset-form.svelte'

	export let data
</script>

<AuthFormCard title="Reset your password">
	<PasswordResetForm form={data.form} />
</AuthFormCard>
