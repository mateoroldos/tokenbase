<script lang="ts">
	import {
		MAX_PASSWORD_SIZE,
		MIN_PASSWORD_SIZE
	} from '$lib/features/auth/config/passwordValidators'
	import { Eye, EyeOff } from 'lucide-svelte'
	import FormInput from './form-input.svelte'

	let type: 'password' | 'text' = 'password'
</script>

<div class="relative">
	<FormInput
		{type}
		required
		maxlength={MAX_PASSWORD_SIZE}
		minlength={MIN_PASSWORD_SIZE}
	/>
	{#if type === 'password'}
		<div
			class="absolute right-0 top-0 h-full w-10 flex items-center justify-center cursor-pointer"
			on:click={() => {
				type = 'text'
			}}
			tabindex="-1"
		>
			<Eye class="h-4 w-4 text-slate-400" />
		</div>
	{:else}
		<div
			class="absolute right-0 top-0 h-full w-10 flex items-center justify-center cursor-pointer"
			on:click={() => {
				type = 'password'
			}}
			tabindex="-1"
		>
			<EyeOff class="h-4 w-4 text-slate-400" />
		</div>
	{/if}
</div>
