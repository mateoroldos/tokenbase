<script>
	import Logo from '$lib/components/Logo.svelte'
	import Container from './atoms/Container/Container.svelte'
	import SocialIcons from './atoms/SocialIcons.svelte'
</script>

<footer class="w-full border-t bg-slate-100 border-t-slate-200 pt-6 mx-auto">
	<Container>
		<div class="justify-between flex px-2 py-4 items-center">
			<Logo />
		</div>
		<div class="justify-between flex px-4 pt-8 sm:pt-16 items-center">
			<a href="/about"
				><p class="text-slate-500 text-sm hover:text-black">About us</p></a
			>
		</div>
		<div class="justify-between flex px-4 pt-4 pb-6 sm:mb-10 items-center">
			<a href="/articles"
				><p class="text-slate-500 text-sm hover:text-black">Blog</p></a
			>
			<SocialIcons />
		</div>
	</Container>
</footer>
