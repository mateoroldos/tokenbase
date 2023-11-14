<script lang="ts">
	import { enhance } from '$app/forms'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import ErrorDisplay from './atoms/ErrorDisplay.svelte'
	import PasswordVisibilityToggle from './atoms/PasswordVisibilityToggle.svelte'

	export let form: any

	let showPassword = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

<form method="post" use:enhance>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Password</span>
		</label>

		<div class="relative">
			<Input
				autocomplete="off"
				type={showPassword ? 'text' : 'password'}
				placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
				class="input input-bordered w-full max-w-xs pr-10"
				name="password"
				required
			/>
			<PasswordVisibilityToggle {showPassword} {togglePasswordVisibility} />
		</div>
		{#if form?.incorrect && form?.errors.passwordError !== null}
			<ErrorDisplay form={form?.errors.passwordError[0]} />
		{/if}
	</div>
	{#if form?.message}
		<ErrorDisplay form={form.message} />
	{/if}
	<div class="flex flex-col">
		<Button class="btn btn-primary mt-4 max-w-xs" type="submit">Submit</Button>
	</div>
</form>
