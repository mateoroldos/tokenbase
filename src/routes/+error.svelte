<script>
	import { page } from '$app/stores'
	import Logo from '$lib/components/Logo.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
</script>

<section class="flex-1 flex">
	<div
		class="container flex-1 flex flex-col items-center justify-center gap-14"
	>
		<Logo width="w-7" height="w-7" fontSize="text-2xl" />
		<div class="flex itmes-center justify-center">
			<h2 class="text-4xl text-center font-medium mr-2">
				{$page.status}
			</h2>
			<p class="text-4xl text-center text-slate-500 font-thin">
				{$page.error?.message}
			</p>
		</div>
		<Button href="/" size="lg">Go Home</Button>
	</div>
</section>

<style>
	section {
		background:
			linear-gradient(
				rgba(248, 250, 252, 0.6),
				rgba(248, 250, 252, 0.9),
				rgba(248, 250, 252, 0.99),
				rgba(248, 250, 252, 0.98),
				rgba(248, 250, 252, 0.8),
				rgb(248, 250, 252, 0.5)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(226, 232, 240) 0
				) -2px -2px/25px 25px,
			rgb(248, 250, 252);
	}
</style>
