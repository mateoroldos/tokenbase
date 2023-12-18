<script>
	import Container from './../_components/atoms/Container/Container.svelte'
	import Section from './../_components/atoms/Section/Section.svelte'
	import '../_assets/css/about.css'
	import { preloadCode } from '$app/navigation'
	import { onMount } from 'svelte'
	import { currentPage } from '../_assets/ts/currentPageStore'
	import { navItems } from '../../../lib/config'
	import PageHeading from '../_components/atoms/PageHeading.svelte'

	export let data

	$: currentPage.set(data.path)
	onMount(() => {
		const navRoutes = navItems.map((item) => item.route)
		preloadCode(...navRoutes)
	})
</script>

<Section>
	<Container class="about max-w-[50ch] flex flex-col gap-12">
		<PageHeading title="About Tokenbase" />
		<article>
			<slot />
		</article>
	</Container>
</Section>
