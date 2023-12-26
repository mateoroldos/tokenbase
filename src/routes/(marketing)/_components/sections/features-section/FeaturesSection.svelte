<script lang="ts">
	import Container from '../../atoms/Container/Container.svelte'
	import Section from '../../atoms/Section/Section.svelte'
	import FeatureCard from './atoms/FeatureCard.svelte'
	import { FEATURES } from './features'
</script>

<Section>
	<Container class="flex flex-col gap-14">
		<div class="flex flex-col items-center gap-6">
			<h2 class="text-6xl font-medium text-center max-w-[20ch]">
				A Toolbox to handle your Design Tokens.
			</h2>
			<p class="text-xl text-slate-500 text-center max-w-[40ch]">
				Create your Design System in seconds and export it to whatever you want.
			</p>
		</div>
		<div class="grid grid-cols-9 gap-8">
			{#each FEATURES as { title, description, image, gridPosition }}
				<FeatureCard {title} {description} {image} {gridPosition} />
			{/each}
		</div>
	</Container>
</Section>

<style>
	.grid {
		grid-template-areas:
			'one one one one one one two two two'
			'three three three three four four four four four'
			'five five five six six six seven seven seven';
	}
</style>
