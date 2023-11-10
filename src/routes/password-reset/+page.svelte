<script lang="ts">
	import { enhance } from '$app/forms'
	import { AlertCircle, ArrowLeft } from 'lucide-svelte'
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
				<Card.Title class="text-2xl">Reset your password</Card.Title>
			</Card.Header>
			<Card.Content class="text-sm">
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
							<div
								class="flex flex-row items-center text-red-600 bg-blend-color-burn"
							>
								<AlertCircle class="mr-1 h-3 w-3" />
								<p class="text-sm text-red-600">
									{form?.errors.emailError[0]}
								</p>
							</div>
						{/if}
					</div>
					<div class="flex flex-col">
						<Button type="submit" class="btn btn-primary mt-4 max-w-xs"
							>Submit</Button
						>
					</div>
					{#if form?.message}
						<AlertCircle class="mr-1 h-3 w-3" />
						<p class="text-sm text-red-600">{form.message}</p>
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
			</Card.Content>
		</Card.Root>
	</div>
</section>
