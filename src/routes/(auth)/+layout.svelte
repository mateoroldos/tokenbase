<section class="flex-1 flex items-center justify-center">
	<div class="container max-w-[400px]">
		<slot />
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
