<script lang="ts">
	import { enhance } from '$app/forms'
</script>

<form
	class="bg-base-200 mx-auto mt-20 flex max-w-sm flex-col items-center justify-center rounded-lg py-6"
	use:enhance
	action="?/register"
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Nombres</span>
		</label>
		<input
			type="text"
			autocomplete="off"
			placeholder="Name"
			class="input input-bordered w-full max-w-xs"
			name="names"
			required
		/>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Last Names</span>
		</label>
		<input
			type="text"
			autocomplete="off"
			placeholder="Name"
			class="input input-bordered w-full max-w-xs"
			name="last_names"
			required
		/>
	</div>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Nombre de usuario</span>
		</label>
		<input
			type="text"
			autocomplete="off"
			placeholder="Username"
			class="input input-bordered w-full max-w-xs"
			name="username"
			required
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Contraseña</span>
		</label>
		<input
			type="text"
			autocomplete="off"
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
	</div>

	<button class="btn btn-primary mt-4 max-w-xs" type="submit"
		>Crear cuenta</button
	>
</form>
