<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import HeroSection from '$lib/components/welcome-section/HeroSection.svelte'
	import RegisterForm from '$lib/features/user-management/components/forms/RegisterForm.svelte'
	import type { ActionData } from './$types'

	export let form: ActionData
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
					<RegisterForm {form} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-2 flex items-center justify-center bg-slate-50">
			<HeroSection />
		</div>
	</div>
</section>
