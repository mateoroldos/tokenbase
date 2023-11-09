<script lang="ts">
	import { enhance } from '$app/forms'
	import { AlertCircle } from 'lucide-svelte'
	import type { ActionData } from './$types'
	import * as Card from '$lib/components/ui/card'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'

	export let form: ActionData
</script>

<section class="flex flex-1 items-center justify-center bg-slate-50 p-20">
	<div class="max-w-l col col-span-1 flex flex-col items-center justify-center">
		<Card.Root class="shadow-m mx-auto flex flex-col border-slate-200">
			<Card.Header>
				<img
					src="/LOGO_TOKENBASE.png"
					alt="Logo"
					class="mb-6 h-8 w-8 object-cover"
				/>
				<Card.Title class="text-2xl">Reset Password</Card.Title>
			</Card.Header>
			<Card.Content class="text-m">
				<div class="form-control flex w-full max-w-xs flex-col gap-2" />
				<form method="post" use:enhance>
					<p class="label-text pb-2 text-sm">Email</p>

					<Input
						type="text"
						placeholder="Email"
						class="input input-bordered w-full max-w-xs"
						name="email"
						required
					/><br />
					{#if form?.incorrect && form?.errors.emailError !== null}
						<div
							class="flex flex-row items-center text-red-600 bg-blend-color-burn"
						>
							<AlertCircle class="mr-2 h-4 w-4" />
							<p class=" text-xs text-red-600">
								{form?.errors.emailError[0]}
							</p>
						</div>
					{/if}
					<div class="flex flex-col items-center justify-center">
						<Button type="submit" class="btn btn-primary max-w-xs"
							>Submit</Button
						>
					</div>
				</form>
				{#if form?.message}
					<p class="error pt-2 text-xs">{form.message}</p>
				{/if}
				{#if form?.success}
					<p class="pt-2 text-xs">
						Your password reset link was sent to your inbox
					</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</section>
