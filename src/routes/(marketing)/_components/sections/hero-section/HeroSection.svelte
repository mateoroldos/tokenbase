<script lang="ts">
	import { ArrowRight } from 'lucide-svelte'
	import Container from '../../atoms/Container/Container.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
</script>

<section class="py-8">
	<Container class="flex flex-col gap-14 items-center py-14">
		<div class="flex flex-col items-center gap-4">
			<h1 class="font-medium text-7xl text-center max-w-[20ch]">
				Design Systems, made easy.
			</h1>
			<p class="text-center text-3xl text-slate-400">
				Easily create, manage and distribute your Design Tokens.
			</p>
		</div>
		<div class="flex flex-col gap-3 items-center">
			<Button size="lg" href="/login">
				Get Started <ArrowRight class="color-white h-4" />
			</Button>
			<span class="text-sm text-slate-400">Open Beta • 100% free</span>
		</div>
		<img
			class="rounded-lg shadow-xl border"
			src="/images/app-screenshot.png"
			alt="Tokenbase app screenshot"
		/>
	</Container>
</section>

<style>
	section {
		background:
			linear-gradient(
				rgba(242, 245, 249, 0.3),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 0.95),
				rgba(242, 245, 249, 1)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
