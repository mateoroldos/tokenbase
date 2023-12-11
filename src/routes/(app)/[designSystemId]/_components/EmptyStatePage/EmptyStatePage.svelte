<div class="flex h-full flex-col gap-12 overflow-y-auto px-48 py-16">
	<slot />
</div>

<style>
	div {
		background: linear-gradient(
				rgba(255, 255, 255, 0.6),
				rgba(255, 255, 255, 0.95),
				rgba(255, 255, 255, 0.99),
				rgba(255, 255, 255, 1),
				rgba(255, 255, 255, 1),
				rgb(255, 255, 255)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
