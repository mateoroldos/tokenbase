<div
	class="flex h-full flex-col gap-12 overflow-y-auto justify-center p-8 items-center"
>
	<slot />
</div>

<style>
	div {
		background:
			linear-gradient(
				rgba(255, 255, 255, 0.6),
				rgba(255, 255, 255, 0.9),
				rgba(255, 255, 255, 0.99),
				rgba(255, 255, 255, 0.98),
				rgba(255, 255, 255, 0.8),
				rgb(255, 255, 255, 0.5)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
