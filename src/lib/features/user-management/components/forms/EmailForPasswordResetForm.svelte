<script lang="ts">
	import { enhance } from '$app/forms'
	import { ArrowLeft, Loader } from 'lucide-svelte'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import DisplayErrorMessage from '$lib/features/user-management/components/forms/atoms/DisplayErrorMessage.svelte'
	import type { ActionData } from '../../../../../routes/password-reset/$types'

	export let form: ActionData

	let formLoading = false
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
			<DisplayErrorMessage errorMessage={form?.errors.emailError[0]} />
		{/if}
		{#if form?.message}
			<DisplayErrorMessage errorMessage={form.message} />
		{/if}
	</div>
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
	{#if form?.success}
		<p class="pt-4 text-sm">
			A password reset link was sent your email address.
		</p>
	{/if}
	<p class="pt-4">
		<a href="/login" class="link link-hover font-semibold">
			<div class="flex flex-row items-center">
				<ArrowLeft class="mr-1 h-3 w-3" />
				Back to login
			</div>
		</a>
	</p>
</form>
