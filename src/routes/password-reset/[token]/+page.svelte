<script lang="ts">
	import { enhance } from '$app/forms'
	import { AlertCircle, Eye, EyeOff } from 'lucide-svelte'
	import type { ActionData } from './$types'
	import * as Card from '$lib/components/ui/card'
	import Input from '$lib/components/ui/input/Input.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'

	export let form: ActionData

	let showPassword = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
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
			<Card.Content class="text-sm">
				<form method="post" use:enhance>
					<div
						class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-4"
					>
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
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
								on:click={togglePasswordVisibility}
							>
								{#if showPassword}
									<EyeOff class="h-4 w-4" />
								{:else}
									<Eye class="h-4 w-4" />
								{/if}
							</button>
						</div>
						{#if form?.incorrect && form?.errors.passwordError !== null}
							<div
								class="flex flex-row items-center text-red-600 bg-blend-color-burn"
							>
								<AlertCircle class="mr-1 h-3 w-3" />
								<p class="text-sm text-red-600">
									{form?.errors.passwordError[0]}
								</p>
							</div>
						{/if}
					</div>
					{#if form?.message}
						<div class="flex flex-col text-xs">
							<p class="error">{form.message}</p>
						</div>
					{/if}
					<div class="flex flex-col">
						<Button class="btn btn-primary mt-4 max-w-xs" type="submit"
							>Submit</Button
						>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</section>
