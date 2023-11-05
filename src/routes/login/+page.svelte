<script>
	import { enhance } from '$app/forms'
	import { AlertCircle } from 'lucide-svelte'

	export let form
</script>

<form
	class="bg-base-200 mx-auto mt-20 flex max-w-sm flex-col items-center justify-center rounded-lg py-6"
	use:enhance
	action="?/login"
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Nombre de usuario</span>
		</label>
		<input
			type="text"
			placeholder="Username"
			class="input input-bordered w-full max-w-xs"
			name="username"
			required
		/>
		{#if form?.incorrect && form?.errors.usernameError !== null}
			<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
				<AlertCircle class="mr-2 h-4 w-4" />
				<p class=" text-red-600">
					{form?.errors.usernameError[0]}
				</p>
			</div>
		{/if}
	</div>

	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Contraseña</span>
		</label>
		<input
			type="text"
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
		{#if form?.incorrect && form?.errors.passwordError !== null}
			<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
				<AlertCircle class="mr-2 h-4 w-4" />
				<p class="text-red-600">
					{form?.errors.passwordError[0]}
				</p>
			</div>
		{/if}
	</div>
	{#if form?.usernameError}
		<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
			<AlertCircle class="mr-2 h-4 w-4" />
			<p class=" text-red-600">Username doesn't exist</p>
		</div>
	{/if}
	{#if form?.passwordError}
		<div class="flex flex-row items-center text-red-600 bg-blend-color-burn">
			<AlertCircle class="mr-2 h-4 w-4" />
			<p class=" text-red-600">Wrong password</p>
		</div>
	{/if}

	<button class="btn btn-primary mt-4 max-w-xs" type="submit"
		>Iniciar Sesion</button
	>

	<p class="pt-4">
		Dont have an account? <a
			href="/register"
			class="link link-hover font-semibold">Register</a
		>.
	</p>
</form>
