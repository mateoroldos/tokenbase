<script lang="ts">
	import { enhance } from '$app/forms'

	import type { ActionData } from './$types'
	import { AlertCircle } from 'lucide-svelte'

	export let form: ActionData
</script>

<h1>Reset password</h1>
<form method="post" use:enhance>
	<label for="password">New Password</label>
	<input name="password" id="password" /><br />
	{#if form?.incorrect && form?.errors.passwordError !== null}
		<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
			<AlertCircle class="mr-2 h-4 w-4" />
			<p class=" text-red-600">
				{form?.errors.passwordError[0]}
			</p>
		</div>
	{/if}
	<input type="submit" />
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
