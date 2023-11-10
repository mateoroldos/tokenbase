<script>
	import { enhance } from '$app/forms'
	import * as Card from '$lib/components/ui/card'
	import { AlertCircle } from 'lucide-svelte'
	import { Input } from '$lib/components/ui/input'
	import Button from '$lib/components/ui/button/Button.svelte'
	import HeroSection from '$lib/components/login/HeroSection.svelte'
	import { Eye } from 'lucide-svelte'
	import { EyeOff } from 'lucide-svelte'

	export let form

	let showPassword = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

<section class="flex flex-1 items-center justify-center bg-slate-50 p-20">
	<div class="grid grid-cols-3 gap-10">
		<div
			class="max-w-l col col-span-1 flex flex-col items-center justify-center"
		>
			<Card.Root
				class=" shadow-m flex w-full flex-1 flex-col justify-center border-slate-200 p-4 "
			>
				<Card.Header>
					<img
						src="/LOGO_TOKENBASE.png"
						alt="Logo"
						class="mb-6 h-8 w-8 object-cover"
					/>
					<Card.Title class=" text-2xl ">Log in</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm">
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
						</div>

						<div
							class="form-control flex w-full max-w-xs flex-col gap-2 pb-3 pt-3"
						>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<div class="relative">
								<Input
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
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
							<a href="/password-reset">
								<p class="pt-4 text-left">Forgot your password?</p>
							</a>
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
						{#if form?.emailError}
							<div
								class="flex flex-row items-center text-red-600 bg-blend-color-burn"
							>
								<AlertCircle class="mr-2 h-4 w-4" />
								<p class=" text-red-600">Email is not registered</p>
							</div>
						{/if}
						{#if form?.passwordError}
							<div
								class="flex flex-row items-center text-red-600 bg-blend-color-burn"
							>
								<AlertCircle class="mr-2 h-4 w-4" />
								<p class=" text-red-600">Wrong password</p>
							</div>
						{/if}

						<Button class="btn btn-primary mt-4 max-w-xs" type="submit"
							>Log in</Button
						>

						<p class="pt-4">
							Dont have an account? <a
								href="/register"
								class="link link-hover font-semibold">Register</a
							>.
						</p>
					</form>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-2 flex items-center justify-center bg-slate-50">
			<HeroSection />
		</div>
	</div>
</section>
