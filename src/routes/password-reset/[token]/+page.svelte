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
					<p class="label-text pb-2 text-sm">New Password</p>
					<Input name="password" id="password" /><br />
					{#if form?.incorrect && form?.errors.passwordError !== null}
						<div
							class="flex flex-row items-center text-red-600 bg-blend-color-burn"
						>
							<AlertCircle class="mr-2 h-4 w-4" />
							<p class=" text-red-600">
								{form?.errors.passwordError[0]}
							</p>
						</div>
					{/if}
					<div class="flex flex-col">
						<Button class="btn btn-primary max-w-xs" type="submit"
							>Submit</Button
						>
					</div>
				</form>
				{#if form?.message}
					<div class="flex flex-col text-xs">
						<p class="error">{form.message}</p>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</section>
