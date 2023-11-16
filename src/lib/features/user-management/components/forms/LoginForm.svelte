<script lang="ts">
	import { enhance } from '$app/forms'
	import { Input } from '$lib/components/ui/input'
	import Button from '$lib/components/ui/button/Button.svelte'
	import ErrorDisplay from './atoms/ErrorDisplay.svelte'
	import PasswordVisibilityToggle from './atoms/PasswordVisibilityToggle.svelte'

	export let form: any
	let showPassword = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

<form
	class="bg-base-200 flex flex-col rounded-lg"
	use:enhance
	action="?/login"
	method="post"
>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pt-3">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Email</span>
		</label>
		<Input
			type="text"
			placeholder="johndoe@example.com"
			class="input input-bordered w-full max-w-xs"
			name="email"
			required
		/>
		{#if form?.incorrect && form?.errors.emailError !== null}
			<ErrorDisplay form={form?.errors.emailError[0]} />
		{/if}
		{#if form?.emailError}
			<ErrorDisplay form="Email is not registered " />
		{/if}
	</div>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-3">
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
		{#if form?.passwordError}
			<ErrorDisplay form="Invalid password" />
		{/if}
		<a href="/password-reset">
			<p class="pt-4 text-left">Forgot your password?</p>
		</a>
	</div>
	<Button class="btn btn-primary mt-4 max-w-xs" type="submit">Log in</Button>
	<p class="pt-4">
		Dont have an account? <a
			href="/register"
			class="link link-hover font-semibold">Register</a
		>
	</p>
</form>
