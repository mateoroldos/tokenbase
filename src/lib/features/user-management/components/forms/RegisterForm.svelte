<script lang="ts">
	import { enhance } from '$app/forms'
	import { Input } from '$lib/components/ui/input'
	import Button from '$lib/components/ui/button/Button.svelte'
	import DisplayErrorMessage from './atoms/DisplayErrorMessage.svelte'
	import PasswordVisibilityToggle from './atoms/PasswordVisibilityToggle.svelte'
	import type { ActionData } from '../../../../../routes/register/$types'
	import { Loader } from 'lucide-svelte'

	export let form: ActionData

	let showPassword = false
	let formLoading = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

<form
	class="bg-base-200 flex flex-col rounded-lg"
	use:enhance={() => {
		formLoading = true
		return async ({ update }) => {
			await update()
			formLoading = false
		}
	}}
	action="?/register"
	method="post"
>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pt-3">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Email</span>
		</label>
		<Input
			type="text"
			autocomplete="off"
			placeholder="johndoe@example.com"
			class="input input-bordered w-full max-w-xs"
			name="email"
			required
		/>
		{#if form?.incorrect && form?.errors.emailError !== null}
			<DisplayErrorMessage errorMessage={form?.errors.emailError[0]} />
		{/if}
		{#if form?.duplicatedEmail}
			<DisplayErrorMessage errorMessage={'Email already registered'} />
		{/if}
	</div>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pt-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Username</span>
		</label>
		<Input
			type="text"
			autocomplete="off"
			placeholder="johndoe123"
			class="input input-bordered w-full max-w-xs"
			name="username"
			required
		/>
		{#if form?.incorrect && form?.errors.usernameError !== null}
			<DisplayErrorMessage errorMessage={form?.errors.usernameError[0]} />
		{/if}
		{#if form?.duplicatedUsername}
			<DisplayErrorMessage errorMessage={'Username already exists'} />
		{/if}
	</div>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pt-4">
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
			<DisplayErrorMessage errorMessage={form?.errors.passwordError[0]} />
		{/if}
	</div>
	<div class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Confirm password</span>
		</label>
		<div class="relative">
			<Input
				autocomplete="off"
				type={showPassword ? 'text' : 'password'}
				placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
				class="input input-bordered w-full max-w-xs pr-10"
				name="confirmPassword"
				required
			/>
			<PasswordVisibilityToggle {showPassword} {togglePasswordVisibility} />
		</div>
		{#if form?.incorrect && form?.errors.passwordConfirmError !== null}
			<DisplayErrorMessage
				errorMessage={form?.errors.passwordConfirmError[0]}
			/>
		{/if}
	</div>
	{#if formLoading}
		<Button class="btn btn-primary mt-4 max-w-xs">
			<Loader />
		</Button>
	{:else}
		<Button class="btn btn-primary mt-4 max-w-xs " type="submit">
			Create account</Button
		>
	{/if}

	<p class="pt-4">
		Already have an account? <a
			href="/login"
			class="link link-hover font-semibold">Login</a
		>.
	</p>
</form>
