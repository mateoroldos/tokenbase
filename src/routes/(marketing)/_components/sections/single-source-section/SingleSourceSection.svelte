<script lang="ts">
	import Container from '../../atoms/Container/Container.svelte'
	import Section from '../../atoms/Section/Section.svelte'
	import DesignSystemCard from '../export-types-section/atoms/DesignSystemCard.svelte'
	import VariablesCard from '../export-types-section/atoms/VariablesCard.svelte'
	import { VARIABLES } from './variables'
</script>

<Section>
	<Container class="flex flex-col items-center gap-14">
		<div class="flex flex-col items-center gap-6 z-10">
			<h2 class="text-6xl font-medium text-center max-w-[20ch]">
				A single source of truth for your styles
			</h2>
			<p class="text-xl text-slate-500 text-center max-w-[40ch]">
				Connect designers and developers with a single source of truth with your
				design decisions.
			</p>
		</div>
		<div
			class="hidden md:grid md:grid-cols-[2fr_1fr_2fr] justify-center items-center max-w-[800px] z-10"
		>
			<div class="z-10">
				<DesignSystemCard variables={VARIABLES} />
			</div>
			<div class="relative flex place-content-center overflow-hidden">
				<div class="wave h-20 move-right-infinite" />
				<img
					src="/LOGO_TOKENBASE.png"
					alt="Logo"
					class="h-12 w-12 scale-75 sm:scale-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md"
				/>
			</div>
			<div class="z-10">
				<VariablesCard variables={VARIABLES} />
			</div>
		</div>
	</Container>
</Section>

<style>
	.wave {
		background: black;
		--mask: radial-gradient(
					10.63px at 50% calc(100% + 4.4px),
					#0000 calc(99% - 3px),
					#000 calc(101% - 3px) 99%,
					#0000 101%
				)
				calc(50% - 16px) calc(50% - 5.5px + 0.5px) / 32px 11px repeat-x,
			radial-gradient(
					10.63px at 50% -4.4px,
					#0000 calc(99% - 3px),
					#000 calc(101% - 3px) 99%,
					#0000 101%
				)
				50% calc(50% + 5.5px) / 32px 11px repeat-x;
		-webkit-mask: var(--mask);
		mask: var(--mask);
		min-width: 99999px;
	}

	.move-right-infinite {
		animation: move-right-infinite 1000s infinite linear;
	}

	@keyframes move-right-infinite {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(50%);
		}
	}
</style>
