<script lang="ts">
	import { enhance } from '$app/forms'
	import { AlertCircle } from 'lucide-svelte'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<h1>Reset password</h1>
<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" id="email" /><br />
	{#if form?.incorrect && form?.errors.emailError !== null}
		<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
			<AlertCircle class="mr-2 h-4 w-4" />
			<p class=" text-red-600">
				{form?.errors.emailError[0]}
			</p>
		</div>
	{/if}
	<input type="submit" />
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
{#if form?.success}
	<p>Your password reset link was sent to your inbox</p>
{/if}

<a href="/login">Sign in</a>
