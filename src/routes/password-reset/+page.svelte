<script lang="ts">
	import type { ActionData } from './$types'
	import * as Card from '$lib/components/ui/card'
	import EmailForPasswordResetForm from '$lib/components/forms/EmailForPasswordResetForm.svelte'

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
				<EmailForPasswordResetForm {form} />
			</Card.Content>
		</Card.Root>
	</div>
</section>
