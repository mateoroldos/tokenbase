<script lang="ts">
	import { enhance } from '$app/forms'
	import * as Card from '$lib/components/ui/card'
	import type { ActionData } from '../[usermail]/$types'

	export let form: ActionData
</script>

<section
	class="flex flex-1 flex-col gap-10 items-center justify-center bg-slate-50 p-20"
>
	<Card.Root class="shadow-m mx-auto flex flex-col border-slate-200">
		<Card.Header>
			<img
				src="/LOGO_TOKENBASE.png"
				alt="Logo"
				class="mb-6 h-8 w-8 object-cover"
			/>
			<Card.Title class="text-xl">Email verification</Card.Title>
		</Card.Header>
		<Card.Content class="text-sm">
			<p>A verification link was sent to the email address provided.</p>
		</Card.Content>
		<Card.Footer class="text-center">
			<p class=" text-sm">Didn't receive the link? &nbsp</p>
			<form method="post" use:enhance>
				<button type="submit" class="text-sm font-semibold">Resend</button>
			</form>

			{#if form?.success}
				<div>
					<p class="text-sm">&nbsp The verification link was resent</p>
				</div>
			{:else if form?.notUser}
				<div>
					<p class="text-sm">&nbsp The user doesn't exist</p>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</section>
