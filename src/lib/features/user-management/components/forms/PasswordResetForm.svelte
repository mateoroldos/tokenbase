<script lang="ts">
	import { enhance } from '$app/forms'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import DisplayErrorMessage from './atoms/DisplayErrorMessage.svelte'
	import PasswordVisibilityToggle from './atoms/PasswordVisibilityToggle.svelte'
	import type { ActionData } from '../../../../../routes/password-reset/[token]/$types'
	import { Loader } from 'lucide-svelte'

	export let form: ActionData

	let showPassword = false
	let formLoading = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

<form
	method="post"
	use:enhance={() => {
		formLoading = true
		return async ({ update }) => {
			await update()
			formLoading = false
		}
	}}
>
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
			<DisplayErrorMessage errorMessage={form?.errors.passwordError[0]} />
		{/if}
	</div>
	{#if form?.message}
		<DisplayErrorMessage errorMessage={form.message} />
	{/if}
	<div class="flex flex-col">
		{#if formLoading}
			<Button class="btn btn-primary mt-4 max-w-xs">
				<Loader />
			</Button>
		{:else}
			<Button type="submit" class="btn btn-primary mt-4 max-w-xs">Submit</Button
			>
		{/if}
	</div>
</form>
