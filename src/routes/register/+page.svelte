<script lang="ts">
	import { enhance } from '$app/forms'
	import { AlertCircle } from 'lucide-svelte'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import Button from '$lib/components/ui/button/Button.svelte'
	import HeroSection from '$lib/components/login/HeroSection.svelte'

	export let form
</script>

<section class="flex flex-1 items-center justify-center bg-slate-50 p-20">
	<div class="grid grid-cols-3 gap-10">
		<div class="max-w-l col col-span-1 items-center justify-center">
			<Card.Root
				class=" shadow-m flex h-full w-full flex-1 flex-col justify-center border-slate-200 p-4"
			>
				<Card.Header>
					<img
						src="/LOGO_TOKENBASE.png"
						alt="Logo"
						class="mb-6 h-8 w-8 object-cover"
					/>
					<Card.Title class=" text-2xl ">Create Account</Card.Title>
				</Card.Header>

				<Card.Content class="text-sm">
					<form
						class="bg-base-200 flex flex-col rounded-lg"
						use:enhance
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
								placeholder="Email"
								class="input input-bordered w-full max-w-xs"
								name="email"
								required
							/>
							{#if form?.incorrect && form?.errors.emailError !== null}
								<div
									class="flex flex-row items-center text-red-600 bg-blend-color-burn"
								>
									<AlertCircle class="mr-2 h-4 w-4" />
									<p class=" text-red-600">
										{form?.errors.emailError[0]}
									</p>
								</div>
							{/if}
							{#if form?.duplicated}
								<div
									class="flex flex-row items-center text-red-600 bg-blend-color-burn"
								>
									<AlertCircle class="mr-2 h-4 w-4" />
									<p class=" text-red-600">Email already registered</p>
								</div>
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
								placeholder="Username"
								class="input input-bordered w-full max-w-xs"
								name="username"
								required
							/>
							{#if form?.incorrect && form?.errors.usernameError !== null}
								<div
									class="flex flex-row items-center text-red-600 bg-blend-color-burn"
								>
									<AlertCircle class="mr-2 h-4 w-4" />
									<p class=" text-red-600">
										{form?.errors.usernameError[0]}
									</p>
								</div>
							{/if}
							{#if form?.duplicatedUsername}
								<div
									class="flex flex-row items-center text-red-600 bg-blend-color-burn"
								>
									<AlertCircle class="mr-2 h-4 w-4" />
									<p class=" text-red-600">Username already exists</p>
								</div>
							{/if}
						</div>

						<div
							class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-4"
						>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<Input
								type="text"
								autocomplete="off"
								placeholder="Password"
								class="input input-bordered w-full max-w-xs"
								name="password"
								required
							/>
							{#if form?.incorrect && form?.errors.passwordError !== null}
								<div
									class="flex flex-row items-center text-red-600 bg-blend-color-burn"
								>
									<AlertCircle class="mr-2 h-4 w-4" />
									<p class="text-red-600">
										{form?.errors.passwordError[0]}
									</p>
								</div>
							{/if}
						</div>

						<Button class="btn btn-primary mt-4 max-w-xs " type="submit"
							>Create account</Button
						>
					</form>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-2 flex items-center justify-center bg-slate-50">
			<HeroSection />
		</div>
	</div>
</section>
