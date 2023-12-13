<script>
	import LaunchAppButton from './atoms/LaunchAppButton.svelte'
	import SocialIcons from './atoms/SocialIcons.svelte'
	import Container from './atoms/Container/Container.svelte'
	import { navItems } from '../config'
	import Logo from '$lib/components/Logo.svelte'
</script>

<header
	class="pt-3 items-center sticky top-0 left-0 w-full z-50 bg-slate-100 border border-slate-100 border-b-slate-200"
>
	<Container class="flex items-center justify-between pb-3">
		<Logo />
		<div class="flex justify-center items-center">
			<ul class="flex items-center gap-8">
				{#each navItems as page}
					<li>
						<a
							href={page.route}
							class="text-slate-500 text-center pr-2 hover:text-primary"
						>
							{page.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="hidden sm:flex gap-4 justify-center items-center">
			<SocialIcons />
			<LaunchAppButton />
		</div>
	</Container>
</header>
