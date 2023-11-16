<script lang="ts">
	import { enhance } from '$app/forms'
	import { ArrowLeft } from 'lucide-svelte'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import ErrorDisplay from '$lib/features/user-management/components/forms/atoms/ErrorDisplay.svelte'

	export let form: any
</script>

<form method="post" use:enhance>
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
	</div>
	<div class="flex flex-col">
		<Button type="submit" class="btn btn-primary mt-4 max-w-xs">Submit</Button>
	</div>
	{#if form?.message}
		<ErrorDisplay form={form.message} />
	{/if}
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
