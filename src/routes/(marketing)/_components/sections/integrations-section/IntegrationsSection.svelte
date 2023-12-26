<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte'
	import Container from '../../atoms/Container/Container.svelte'
	import Section from '../../atoms/Section/Section.svelte'
	import IntegrationCard from './atoms/IntegrationCard.svelte'
	import { INTEGRATIONS } from './integrations'
</script>

<Section class="relative">
	<Container class="flex flex-col gap-14">
		<div class="flex flex-col items-center gap-6 z-10">
			<Badge>Coming Soon</Badge>
			<h2 class="text-6xl font-medium text-center max-w-[20ch]">
				Works in sync with the tools you use
			</h2>
			<p class="text-xl text-slate-500 text-center max-w-[40ch]">
				Make your workflow more efficent connecting Tokenbase with the tools you
				already use.
			</p>
		</div>
		<div class="flex flex-row gap-8 justify-center z-10">
			{#each INTEGRATIONS as { title, description, icon }}
				<IntegrationCard {title} {description} {icon} />
			{/each}
		</div>
	</Container>
	<div class="magia">a</div>
</Section>

<style>
	.magia {
		position: absolute;
		top: -40%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		z-index: 0;
		width: 700px;
		height: 700px;
		border-radius: 100%;
		background:
			radial-gradient(
				rgba(242, 245, 249, 0),
				rgba(242, 245, 249, 0.5),
				rgba(242, 245, 249, 0.8),
				rgba(242, 245, 249, 0.85),
				rgba(242, 245, 249, 0.88),
				rgba(242, 245, 249, 0.9),
				rgba(242, 245, 249, 1)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}
</style>
