<script lang="ts">
	import Section from './../../atoms/Section/Section.svelte'
	import VariableCard from './atoms/VariablesCard.svelte'
	import DesignSystemCard from './atoms/DesignSystemCard.svelte'
	import { ArrowRight } from 'lucide-svelte'
	import Container from '../../atoms/Container/Container.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'

	export let variables = [
		{
			text: '--color-brand-100',
			color: '#5585b5',
			description: 'color.brand.100'
		},
		{
			text: '--color-brand-200',
			color: '#53a8b6',
			description: 'color.brand.200'
		},
		{
			text: '--color-brand-300',
			color: '#79c2d0',
			description: 'color.brand.300'
		},
		{
			text: '--color-brand-400',
			color: '#bbe4e9',
			description: 'color.brand.400'
		}
	]
</script>

<div class="squared-background">
	<Section>
		<Container
			class="flex flex-col gap-14 items-center bg-slate-50 border border-slate-200 rounded-3xl py-14 shadow-sm"
		>
			<h1 class="font-bold text-3xl text-center sm:text-5xl">
				Create,manage and distribute<br /> your design tokens
			</h1>
			<div
				class="hidden md:grid md:grid-cols-[2fr_1fr_2fr] justify-center items-center max-w-[800px]"
			>
				<div class="z-10">
					<DesignSystemCard {variables} />
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
					<VariableCard {variables} />
				</div>
			</div>
			<div class="flex flex-col gap-3 items-center">
				<Button size="lg" href="https://app.token-base.com/">
					Create your Design System <ArrowRight class="color-white h-4" />
				</Button>
				<span class="text-xs text-slate-400">Open Beta • 100% free</span>
			</div>
		</Container>
	</Section>
</div>

<style>
	.squared-background {
		background:
			linear-gradient(
				rgba(242, 245, 249, 0.1),
				rgba(242, 245, 249, 0.3),
				rgba(242, 245, 249, 1)
			),
			conic-gradient(
					from 90deg at 1px 1px,
					hsla(0, 0%, 0%, 0) 90deg,
					rgb(230, 230, 230) 0
				) -2px -2px/25px 25px;
	}

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
