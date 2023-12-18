<script>
	import { navItems } from '../../../lib/config'
	import Logo from '$lib/components/Logo.svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import Container from './atoms/Container/Container.svelte'
</script>

<header
	class="py-3 sticky top-0 left-0 z-50 bg-slate-100 border-b border-b-slate-200 h-fit"
>
	<Container class="flex flex-row justify-between items-center">
		<div class="flex flex-row gap-20 items-center">
			<Logo />
			<div class="flex justify-center items-center">
				<ul class="flex items-center gap-6">
					{#each navItems as page}
						<li>
							<a
								href={page.route}
								class="text-slate-500 text-center pr-2 hover:text-primary text-sm"
							>
								{page.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="hidden sm:flex gap-3 justify-center items-center">
			<Button size="xs" variant="secondary" href="/login">Sign in</Button>
			<Button size="xs" href="/register">Sign up</Button>
		</div>
	</Container>
</header>
