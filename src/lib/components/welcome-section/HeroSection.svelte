<script lang="ts">
	import { ArrowRight } from 'lucide-svelte'
	import VariableCard from './VariablesCard.svelte'
	import DesignSystemCard from './DesignSystemCard.svelte'
	import { Button } from '../ui/button'

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
	<section>
		<container class="flex flex-col items-center gap-12 bg-slate-50 py-14">
			<div class="flex flex-col gap-2">
				<h3 class="text-center text-xl font-bold sm:text-2xl">
					Welcome to Tokenbase
				</h3>
				<p class="text-center">
					Tokenbase is your minimalist oasis for design token management.<br />
					Seamlessly create, manage, and distribute design tokens like a pro.
				</p>
			</div>
			<div
				class="hidden max-w-[800px] items-center justify-center md:grid md:grid-cols-[2fr_1fr_2fr]"
			>
				<div class="z-10 pl-4">
					<DesignSystemCard {variables} />
				</div>
				<div class="relative flex place-content-center overflow-hidden">
					<div class="wave move-right-infinite h-20" />
					<img
						src="/LOGO_TOKENBASE.png"
						alt="Logo"
						class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 transform shadow-md sm:scale-100"
					/>
				</div>
				<div class="z-10 pr-4">
					<VariableCard {variables} />
				</div>
			</div>
			<div class="flex flex-col items-center gap-3">
				<span class="text-xs text-slate-400">Open Beta • 100% free</span>
			</div>
		</container>
	</section>
</div>

<style>
	.squared-background {
		background: linear-gradient(
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
