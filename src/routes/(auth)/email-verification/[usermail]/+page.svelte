<script lang="ts">
	import AuthFormCard from '$lib/features/auth/components/AuthFormCard.svelte'
	import { enhance } from '$app/forms'
	import type { ActionData } from '../[usermail]/$types'

	export let form: ActionData
</script>

<AuthFormCard
	title="Email verification"
	description="A verification link was sent to the email address provided."
>
	<form method="POST" use:enhance class="text-sm">
		<p class="inline">Didn't receive the link?</p>
		<button type="submit" class="inline text-blue-600 hover:text-blue-800"
			>Resend</button
		>
	</form>
	{#if form?.success}
		<p class="text-sm">The verification link was resent</p>
	{:else if form?.notUser}
		<p class="text-sm">The user doesn't exist</p>
	{/if}
</AuthFormCard>
