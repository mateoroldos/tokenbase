<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let description: string
	export let image: string
	export let gridPosition: string
</script>

<div
	class="card relative shadow-sm flex flex-col justify-between overflow-hidden group border rounded-xl p-2"
	style={`grid-area: ${gridPosition};`}
>
	<Card.Header class="flex flex-col items-center gap-2">
		<Card.Title class="text-2xl font-medium text-center">{title}</Card.Title>
		<Card.Description class="text-md text-center max-w-[40ch]"
			>{description}</Card.Description
		>
	</Card.Header>
	<Card.Footer class="py-0">
		<img
			src={image}
			alt="Templates feature screenshot"
			class="relative bottom-[-10%] group-hover:bottom-[-5%] transition-all duration-300 ease-in-out rounded-sm max-h-[300px]"
		/>
	</Card.Footer>
</div>

<style>
	.card {
		background:
			linear-gradient(
				rgba(242, 245, 249, 1),
				rgba(242, 245, 249, 0.7),
				rgba(242, 245, 249, 0.1)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
