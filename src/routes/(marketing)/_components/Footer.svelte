<script>
	import Logo from '$lib/components/Logo.svelte'
	import Container from './atoms/Container/Container.svelte'
	import LaunchAppBtn from './atoms/LaunchAppButton.svelte'
	import DiscordGithubLogo from './atoms/SocialIcons.svelte'
</script>

<footer
	class="w-full border bg-slate-200 border-slate-300 pt-6 mx-auto rounded-t-3xl shadow-inner"
>
	<Container>
		<div class="justify-between flex px-2 py-4 items-center">
			<Logo />
			<LaunchAppBtn />
		</div>
		<div class="justify-between flex px-4 pt-8 sm:pt-16 items-center">
			<a href="/about"
				><p class="text-slate-500 text-sm hover:text-black">About us</p></a
			>
		</div>
		<div class="justify-between flex px-4 pt-4 pb-6 sm:mb-10 items-center">
			<a href="/"><p class="text-slate-500 text-sm hover:text-black">Blog</p></a
			>
			<DiscordGithubLogo />
		</div>
	</Container>
</footer>
